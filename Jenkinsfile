pipeline {
    agent any

    // ─── Environment ─────────────────────────────────────────────
    environment {
        // Vercel deploy token — create at https://vercel.com/account/tokens
        VERCEL_TOKEN = credentials('VERCEL_TOKEN_FOR_PORTFOLIO')
    }

    stages {
        // ═══════════════════════════════════════════════════════════
        // CHECKOUT
        // ═══════════════════════════════════════════════════════════
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ═══════════════════════════════════════════════════════════
        // INSTALL (frontend + backend en paralelo)
        // ═══════════════════════════════════════════════════════════
        stage('Install') {
            parallel {
                stage('Frontend — Install') {
                    steps {
                        dir('frontend') {
                            bat 'npm ci'
                        }
                    }
                }

                stage('Backend — Install') {
                    steps {
                        dir('backend') {
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // FRONTEND — VALIDATE
        // ═══════════════════════════════════════════════════════════
        stage('Frontend — Lint') {
            steps {
                dir('frontend') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Frontend — Type Check') {
            steps {
                dir('frontend') {
                    bat 'npm run type-check'
                }
            }
        }

        stage('Frontend — Format Check') {
            steps {
                dir('frontend') {
                    bat 'npm run format'
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // BUILD
        // ═══════════════════════════════════════════════════════════
        stage('Frontend — Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend — Build') {
            steps {
                dir('backend') {
                    bat 'npm run build'
                }
            }
        }

        // ═══════════════════════════════════════════════════════════
        // DEPLOY FRONTEND → VERCEL (production, solo en main)
        // ═══════════════════════════════════════════════════════════
        stage('Deploy Frontend to Vercel') {
            when {
                expression {
                    // Works for both Pipeline and Multibranch jobs.
                    // In a simple Pipeline job BRANCH_NAME is null → deploy.
                    // In Multibranch, only deploy from 'main'.
                    env.BRANCH_NAME == null || env.BRANCH_NAME == 'main'
                }
            }
            steps {
                bat """
                    npx vercel deploy --prod --project portfolio --token=%VERCEL_TOKEN% --yes --cwd frontend
                """
            }
        }

        // ═══════════════════════════════════════════════════════════
        // OPCIONAL — Deploy Backend via Docker
        // ═══════════════════════════════════════════════════════════
        // Descomentar cuando tengas un registry configurado:
        //
        // stage('Deploy Backend — Docker') {
        //     when { branch 'main' }
        //     steps {
        //         bat "docker build -f backend/Dockerfile -t portfolio-backend:%BUILD_NUMBER% backend"
        //         // bat "docker push registry.example.com/portfolio-backend:%BUILD_NUMBER%"
        //     }
        // }
    }

    // ─── Post actions ────────────────────────────────────────────
    post {
        success {
            echo 'Pipeline completado exitosamente'
        }
        failure {
            echo 'Pipeline fallo — revisa los logs'
        }
        always {
            cleanWs()
        }
    }
}
