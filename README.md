# Rescuify-AI
> **Real-Time AI-Powered Emergency Triage & Automated Incident Dispatch Network**

---

## 📌 Project Overview
* **Theme:** Theme 3 — Crisis Management, HealthTech & Emergency Response
* **Domain:** Emergency Management, Public Safety & Disaster Response

---

## 🚨 The Problem
During large-scale disasters, accidents, or sudden medical crises, traditional emergency communication channels rapidly become severe bottlenecks. 

* **Congestion and Delays:** Dispatch centers are flooded with unstructured, panicked phone calls and text alerts. Valuable minutes are lost while human operators manually listen, interview victims, and log incident details.
* **Lack of Priority Sorting:** In a chaotic situation, a critical, life-threatening emergency might wait in a queue behind a non-urgent report because there is no automated way to scan and prioritize incoming data instantly.
* **Information Fragmentation:** Critical data points—such as exact locations, numbers of injured individuals, and specific hazards (fire, gas leaks)—remain trapped inside long, unstructured text descriptions or audio transcripts, slowing down field responders.

### 👥 Who It Affects
* **Emergency Dispatchers & First Responders:** Who require instant, prioritized data to deploy limited resources (ambulances, fire trucks, rescue teams) efficiently.
* **Crisis Victims & Field Volunteers:** Who need a reliable, immediate digital channel to report emergencies and receive confirmation that their distress signal has been accurately classified and routed.

### ❌ Why Existing Solutions Fail
* **Manual Triage:** Current emergency dashboards rely on manual sorting or basic keyword matching, which fails to capture the true context, severity, and nuance of natural human language during panic.
* **Lack of Scalability:** When incident volume spikes by 500% during a local disaster, human-centric call centers slow down drastically, leading to fatal delays in emergency dispatch.
* **Rigid Interfaces:** Existing public safety systems require strict form field entries, which users find difficult or impossible to fill out accurately while experiencing an active emergency.

---

## 🧠 The AI-Powered Core Approach
`Rescuify AI` solves this problem by using a central Large Language Model (LLM) engine to act as an instantaneous, automated triage officer. 

1. **Structured Data Extraction:** The user inputs an emergency message in natural language through a single, friction-free text or voice box. The backend immediately feeds this unstructured input to the AI core.
2. **Real-Time Criticality Analysis:** The AI evaluates the context and immediately outputs a structured JSON object scoring the severity level (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), extracting the exact location, identifying the category of crisis, and recommending the required rescue assets.
3. **Automated Dashboard Prioritization:** The processed data is instantly pushed to a live React dashboard for emergency responders, automatically ranking the most critical incidents at the top of the queue to ensure life-saving resources are dispatched without a second of human delay.

---

## 🛠️ Tech Stack & Architecture (Coming Soon)
* **Frontend:** React (Vite) + Tailwind CSS
* **Backend:** Node.js (Express) / Python (FastAPI)
* **AI Core:** Hugging Face / Groq API / OpenAI API
