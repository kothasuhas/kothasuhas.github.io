let showOnlySelected = true;

function renderPapers() {
    function generatePaperHTML(title, authors, conference, link, codeLink, selected) {
        if (codeLink != "NA") {
            codeLinkTag = `<a href="${codeLink}">[code]</a>`
        } else {
            codeLinkTag = ``
        }
        // Add purple heart for previously selected papers
        const heartPrefix = selected ? "💜 " : "";
        return `
            <p style="text-align: left"><a href="${link}">${heartPrefix}${title}</a></p>
            <p style="font-size:0.65em">
                ${authors.join(', ')}
                <br> <i>${conference}</i>&nbsp&nbsp<a href="${link}">[arxiv]</a> ${codeLinkTag}
            </p> <br> `;
    }

    // make a list of papers
    let papers = [
        generatePaperHTML(
            "💜 Pre-training under infinite compute", 
            ["Konwoo Kim<sup>∞</sup>", "Suhas Kotha<sup>∞</sup>", "Percy Liang", "Tatsunori Hashimoto"], 
            "Preprint 2025", 
            "https://arxiv.org/abs/2509.14786",
            "https://github.com/marin-community/marin/tree/suhas/data-efficiency",
            false
        ),
        generatePaperHTML(
            "Repetition Improves Language Model Embeddings", 
            ["Jacob Mitchell Springer", "Suhas Kotha", "Daniel Fried", "Graham Neubig", "Aditi Raghunathan"], 
            "ICLR 2025", 
            "https://arxiv.org/abs/2402.15449",
            "https://github.com/jakespringer/echo-embeddings",
            false
        ),
        generatePaperHTML(
            "Jailbreaking is Best Solved by Definition",
            ["Taeyoun Kim<sup>*</sup>", "Suhas Kotha<sup>*</sup>", "Aditi Raghunathan"],
            "NeurIPS SafeAI Workshop 2024",
            "https://arxiv.org/abs/2403.14725",
            "https://github.com/kothasuhas/purple-problem",
            false
        ),
        generatePaperHTML(
            "A Safe Harbor for AI Evaluation and Red Teaming",
            ["Shayne Longpre et al (23 authors)"],
            "ICML 2024 (Oral Position)",
            "https://arxiv.org/abs/2403.04893",
            "NA",
            false
        ),
        generatePaperHTML(
            "Understanding Catastrophic Forgetting in Language Models via Implicit Inference",
            ["Suhas Kotha", "Jacob Mitchell Springer", "Aditi Raghunathan"],
            "ICLR 2024",
            "https://arxiv.org/abs/2309.10105",
            "https://github.com/kothasuhas/understanding-forgetting",
            false
        ),
        generatePaperHTML(
            "Provably Bounding Neural Network Preimages",
            ["Suhas Kotha<sup>*</sup>", "Christopher Brix<sup>*</sup>", "Zico Kolter", "Krishnamurthy Dvijotham<sup>†</sup>", "Huan Zhang<sup>†</sup>"],
            "NeurIPS 2023 (Spotlight)",
            "https://arxiv.org/abs/2302.01404",
            "https://github.com/kothasuhas/verify-input",
            false
        ),
    ];

    document.getElementById('papers').innerHTML = '';
    
    for (let i = 0; i < papers.length; i++) {
        document.getElementById('papers').innerHTML += papers[i];
        if (i == papers.length - 1) {
            document.getElementById('papers').innerHTML = document.getElementById('papers').innerHTML.slice(0,-6)
        }
    }
}

renderPapers()
