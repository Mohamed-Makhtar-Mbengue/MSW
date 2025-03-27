# MyScienceWork - Plateforme de Recherche

![Badge](https://img.shields.io/badge/Stack-Vue.js%20%2B%20Node.js%20%2B%20ElasticSearch-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📝 Description

Application full-stack permettant :
- 🔍 La recherche de profils chercheurs via ElasticSearch
- 👤 L'affichage détaillé des profils avec publications
- 📊 La gestion des données de recherche

## 🛠 Technologies

### Frontend
- Vue.js 2.x
- Vuex + Vue Router
- Bulma + Buefy
- Font Awesome

### Backend
- Node.js + Express
- MongoDB
- ElasticSearch

## 🚀 Installation

### Prérequis
- Node.js v14+
- MongoDB
- ElasticSearch 7.x
- Git

### Configuration
1. Clonez le dépôt :
```bash
git clone https://github.com/Mohamed-Makhtar-Mbengue/MSW.git
cd MSW
my-science-work-app/
├── backend/
│   ├── models/          # Schémas MongoDB
│   ├── routes/          # API Endpoints
│   └── services/        # Logique métier
├── frontend/
│   ├── src/
│   │   ├── components/  # Composants Vue
│   │   └── views/       # Pages principales
└── docker-compose.yml   # Configuration Docker
