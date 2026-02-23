---
name: transcript-info-extractor
description: Extracts project-specific technical details, challenges, and outcomes from interview transcripts. Use when gathering source material for project pages from transcript files.
---

# Transcript Info Extractor

This skill specializes in mining interview transcripts for project-related information. It helps bridge the gap between spoken interviews and polished project documentation.

## Extraction Strategy

1.  **Project Context**: Identify the specific project being targeted (e.g., "Air Heaters", "Brake Dyno").
2.  **Keyword Search**: Search for mentions of the project name, associated technologies, or specific problems mentioned in the transcript.
3.  **Identify Key Pillars**:
    -   **The "Why" (Context)**: What initiated the project? What was the goal?
    -   **The "How" (Technical)**: What tools, materials, software, or methodologies were used?
    -   **The "Hurdles" (Challenges)**: What went wrong? What were the constraints?
    -   **The "Win" (Results)**: What was achieved? Any metrics or specific outcomes?

## Transcript Location

Transcripts are located at: `C:/Users/Adrin/Documents/Interview_Question_Extraction/processed_transcripts/`

## Output Format

Extract information into the following categories:
-   **Core Summary**: A 1-2 sentence overview.
-   **Technical Specifications**: List of tools, software, components.
-   **Problem/Challenge**: Detailed explanation of the technical or logistical hurdles.
-   **Solution/Implementation**: How the project was executed.
-   **Outcomes**: Final result, impact, or lessons learned.
