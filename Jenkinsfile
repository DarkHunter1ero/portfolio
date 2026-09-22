pipeline {
    agent any

    // ─── Environment ─────────────────────────────────────────────
    environment {
        // Vercel deploy token for frontend — create at https://vercel.com/account/tokens
        VERCEL_TOKEN_FRONTEND = credentials('VERCEL_TOKEN_FOR_PORTFOLIO')
        // Vercel deploy token for backend — create at https://vercel.com/account/tokens
        VERCEL_TOKEN_BACKEND = credentials('VERCEL_TOKEN_FOR_PORTFOLIO_API')
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
        // TEST (db mocked - no Postgres needed in CI)
        // ═══════════════════════════════════════════════════════════
        stage('Backend — Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend — Test') {
            steps {
                dir('frontend') {
                    bat 'npm test'
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
        // DATABASE MIGRATIONS (run before backend deploy)
        // ═══════════════════════════════════════════════════════════
        stage('Backend — DB Migrate') {
            when {
                expression {
                    env.BRANCH_NAME == null || env.BRANCH_NAME == 'main'
                }
            }
            steps {
                dir('backend') {
                    // Run migrations against production database
                    // Requires DATABASE_URL and other env vars to be set in Vercel
                    // This runs locally in Jenkins with access to Vercel env vars
                    bat 'npm run db:migrate'
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
                    npx vercel deploy --prod --project portfolio --token=%VERCEL_TOKEN_FRONTEND% --yes --cwd frontend
                """
            }
        }

        // ═══════════════════════════════════════════════════════════
        // DEPLOY BACKEND → VERCEL (production, solo en main)
        // ═══════════════════════════════════════════════════════════
        stage('Deploy Backend to Vercel') {
            when {
                expression {
                    env.BRANCH_NAME == null || env.BRANCH_NAME == 'main'
                }
            }
            steps {
                dir('backend') {
                    bat """
                        npx vercel deploy --prod --project portfolio-api --token=%VERCEL_TOKEN_BACKEND% --yes --cwd .
                    """
                }
            }
        }
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