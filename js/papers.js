function generatePaperHTML(title, authors, conference, link, codeLink) {
    return `
        <p style="text-align: left"><a href="${link}">${title}</a></p>
        <p style="font-size:0.65em">
            ${authors.join(', ')}
            <br> <i>${conference}</i>&nbsp&nbsp<a href="${link}">[arxiv]</a> <a href="${codeLink}">[code]</a>
        </p>
    `;
}

// make a list of papers
let papers = [
    generatePaperHTML(
        "Repetition Improves Language Model Embeddings", 
        ["Jacob Mitchell Springer", "Suhas Kotha", "Daniel Fried", "Graham Neubig", "Aditi Raghunathan"], 
        "Preprint 2024", 
        "https://arxiv.org/abs/2402.15449",
        "https://github.com/jakespringer/echo-embeddings"
    ),
    generatePaperHTML(
        "Understanding Catastrophic Forgetting in Language Models via Implicit Inference",
        ["Suhas Kotha", "Jacob Mitchell Springer", "Aditi Raghunathan"],
        "ICLR 2024",
        "https://arxiv.org/abs/2309.10105",
        "https://github.com/kothasuhas/understanding-forgetting"
    ),
    generatePaperHTML(
        "Provably Bounding Neural Network Preimages",
        ["Suhas Kotha<sup>*</sup>", "Christopher Brix<sup>*</sup>", "Zico Kolter", "Krishnamurthy Dvijotham<sup>†</sup>", "Huan Zhang<sup>†</sup>"],
        "NeurIPS 2023 (Spotlight)",
        "https://arxiv.org/abs/2302.01404",
        "https://github.com/kothasuhas/verify-input"
    ),
];

for (let i = 0; i < papers.length; i++) {
    document.getElementById('papers').innerHTML += papers[i];
    if (i < papers.length - 1) {
        document.getElementById('papers').innerHTML += '<br>';
    }
}
