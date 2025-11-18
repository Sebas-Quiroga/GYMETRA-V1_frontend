pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        echo ===== ADMIN FRONTEND =====

                        IF EXIST node_modules (
                            echo node_modules encontrado. Omitiendo "npm install".
                        ) ELSE (
                            echo Instalando dependencias...
                            call npm install
                        )

                        echo Verificando build existente...
                        IF EXIST dist (
                            echo Build existente. No se reconstruye.
                        ) ELSE (
                            echo Construyendo proyecto...
                            call npm run build
                        )
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        echo ===== GYMETRA FRONTEND =====

                        IF EXIST node_modules (
                            echo node_modules encontrado. Omitiendo "npm install".
                        ) ELSE (
                            echo Instalando dependencias...
                            call npm install
                        )

                        echo Verificando build existente...
                        IF EXIST dist (
                            echo Build existente. No se reconstruye.
                        ) ELSE (
                            echo Construyendo proyecto...
                            call npm run build
                        )
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo ===== DOCKER COMPOSE =====

                    echo Verificando si Docker Compose ya está levantado...

                    docker compose ps > compose_status.txt
                    findstr /i "Up" compose_status.txt >nul

                    IF %ERRORLEVEL%==0 (
                        echo Servicios ya estan levantados. No se recrea nada.
                    ) ELSE (
                        echo Docker Compose no esta levantado. Levantando servicios...
                        docker compose up -d --build
                    )

                    del compose_status.txt
                '''
            }
        }
    }

    post {
        always {
            bat '''
                echo "Pipeline finalizado correctamente (Windows)."
            '''
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
