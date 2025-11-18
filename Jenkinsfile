pipeline {
    agent any

    environment {
        DOCKER_USER = 'quiroga148'
        EC2_HOST = '3.14.191.19'
        SSH_KEY = 'C:\\ProgramData\\Jenkins\\.ssh\\ec2-key.ppk'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/Sebas-Quiroga/GYMETRA-V1_frontend.git'
            }
        }

        stage('Build Frontend Images') {
            steps {

                dir('frontend/admin-frontend') {
                    bat """
                    docker build --no-cache -t %DOCKER_USER%/gymetra-admin-frontend:latest .
                    """
                }

                dir('frontend/gymetra-frontend') {
                    bat """
                    docker build --no-cache -t %DOCKER_USER%/gymetra-frontend:latest .
                    """
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    echo %PASS% | docker login -u %USER% --password-stdin
                    """
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                bat "docker push %DOCKER_USER%/gymetra-admin-frontend:latest"
                bat "docker push %DOCKER_USER%/gymetra-frontend:latest"
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                bat """
                plink -i "%SSH_KEY%" -ssh ubuntu@%EC2_HOST% ^
                    "cd ~/deploy && docker compose -f docker-compose.front.aws.yml pull && docker compose -f docker-compose.front.aws.yml up -d --remove-orphans"
                """
            }
        }
    }

    post {
        always {
            bat "docker system prune -f"
        }
        success {
            echo 'Frontend desplegado en AWS con éxito 🚀🔥'
        }
        failure {
            echo 'Fallo el despliegue del frontend ❌'
        }
    }
}
