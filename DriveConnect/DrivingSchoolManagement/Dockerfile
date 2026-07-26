FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -jar target/*.jar"]
