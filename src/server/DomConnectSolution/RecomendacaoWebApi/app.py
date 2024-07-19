import json
import pika
import logging
import os
import time
from joblib import load
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URI = "postgresql://postgres:cdfadmin@dc-databse.ceynz4t1zagz.us-east-1.rds.amazonaws.com:5432/DC_Database"
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

modelo_carregado = load('./models/modelo_recomendacao_svd.joblib')

def recommend_based_on_positive_ratings(model, user_id, df_avaliacoes, n=10, rating_threshold=4):
    if user_id not in df_avaliacoes['user_id'].unique():
        print("Usuário não encontrado na matriz de avaliações.")
        return []

    positive_rated_projects = df_avaliacoes[(df_avaliacoes['user_id'] == user_id) & (df_avaliacoes['interest_level'] >= rating_threshold)]['project_id'].tolist()

    if not positive_rated_projects:
        print("Usuário não tem avaliações positivas acima do threshold.")
        return []

    all_projects = df_avaliacoes['project_id'].unique()
    rated_projects = df_avaliacoes[df_avaliacoes['user_id'] == user_id]['project_id'].unique()
    unrated_projects = [project for project in all_projects if project not in rated_projects]

    recommendations = []

    for project_id in positive_rated_projects:
        for unrated_project in unrated_projects:
            predicted_rating = model.predict(user_id, unrated_project).est
            recommendations.append((unrated_project, predicted_rating))

    max_rating = max(recommendations, key=lambda x: x[1])[1] if recommendations else 1
    recommendations = [(proj_id, rating / max_rating) for proj_id, rating in recommendations]

    filtered_recommendations = [(proj_id, rating) for proj_id, rating in recommendations if rating >= 0.7]

    filtered_recommendations = sorted(filtered_recommendations, key=lambda x: x[1], reverse=True)[:n]

    return filtered_recommendations

def on_message(channel, method, properties, body):
    try:
        message = json.loads(body.decode())
        logging.info(f"Message as JSON: {message}")

        user_id = message['user_id']
        interesses = message['interests']

        if user_id is not None:
            df_interesses = pd.DataFrame(interesses)
            recommendations = recommend_based_on_positive_ratings(modelo_carregado, user_id, df_interesses)
            logging.info(f"Recommended projects for user {user_id}: {recommendations}")

            with engine.connect() as connection:
                for project_id, normalized_rating in recommendations:
                    insert_query = """
                    INSERT INTO recommendations (user_id, project_id, result)
                    VALUES (%s, %s, %s)
                    """
                    connection.execute(insert_query, (user_id, project_id, normalized_rating))
            logging.info("Recommendations inserted into the database.")

        else:
            logging.error("No user_id found in the message.")
    
        channel.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        logging.error(f"Failed to process message: {e}")
        channel.basic_nack(delivery_tag=method.delivery_tag, requeue=True)


def consume():
    max_retries = 5
    for attempt in range(max_retries):
        try:
            connection_parameters = pika.ConnectionParameters(host='rabbitmq', port=5672)
            connection = pika.BlockingConnection(connection_parameters)
            channel = connection.channel()
            queue_name = 'RecommendationQueue'
            channel.queue_declare(queue=queue_name, durable=False)
            channel.basic_consume(queue=queue_name, on_message_callback=on_message, auto_ack=False)
            logging.info("Starting to consume")
            channel.start_consuming()
            break
        except pika.exceptions.AMQPConnectionError as e:
            logging.error(f"Failed to connect to RabbitMQ (attempt {attempt + 1} of {max_retries}): {e}")
            time.sleep(5)
    else:
        logging.error("Could not connect to RabbitMQ after several attempts.")

if __name__ == "__main__":
    try:
        logging.info("Starting the consumer")
        consume()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
