## Introduction

### What is Multimodal?

At its simplest, **multimodal** refers to the use of multiple modalities. From a research perspective, it is defined as the scientific study of **heterogeneous** and **interconnected** data.

- **Modality:** Refers to the way something is expressed or perceived (e.g., vision, sound, touch, aroma).
- **The Modality Spectrum:** Modalities exist on a scale from **Raw** (closest to the sensor, like an image or speech signal) to **Abstract** (farthest from the sensor, like sentiment intensity or object categories).

## Heterogeneity and Interconnection

Multimodal data is characterized by how its components differ and how they relate to one another.

### Dimensions of Heterogeneity

Information in different modalities often shows diverse qualities and structures. Key dimensions include:

1. **Element Representation:** Discrete (words) vs. continuous (pixel intensity).
2. **Distribution:** Differences in density and frequency.
3. **Structure:** Temporal, spatial, or hierarchical organization.
4. **Information:** Variations in abstraction and entropy.
5. **Noise:** Differences in uncertainty and missing data.
6. **Relevance:** Task and context dependence.

### Modality Interconnections

Interconnections are split into two primary types:

- **Connected Modalities:** Shared information that relates modalities, such as statistical associations (correlation) or semantic correspondences (grounding).
- **Interacting Modalities:** A process where modalities affect each other during inference to create a new response.

*Examples of interaction responses include:* Redundancy, Dominance, Modulation, and **Emergence** (where a new response $Z$ arises that was not present in the individual inputs).

### The 6 Core Technical Challenges

The course is structured around six fundamental challenges in Multimodal Machine Learning:

1. **Representation**: Learning representations that reflect cross-modal interactions between individual elements.
2. **Alignment**: Identifying and modeling cross-modal connections between elements (e.g., matching a word to a specific object in an image).
3. **Reasoning**: Combining knowledge through multiple inferential steps, exploiting alignment and problem structure.
4. **Generation**: Producing raw modalities that reflect cross-modal interactions and coherence (Summarization, Translation, Creation).
5. **Transference**: Transferring knowledge between modalities to help a target modality that might be noisy or data-limited.
6. **Quantification**: Empirical and theoretical study to understand heterogeneity and the multimodal learning process.

## References

- CMU Multimodal Machine Learning, [Fall 2023](https://cmu-multicomp-lab.github.io/mmml-course/fall2023/)