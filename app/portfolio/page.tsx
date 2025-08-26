"use client"

export default function PortfolioPage() {
  const handleDownloadPDF = () => {
    const link = document.createElement("a")
    link.href = "/adrin-alias-portfolio.pdf"
    link.download = "Adrin-Alias-Portfolio.pdf"
    link.click()
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-balance">Engineering Portfolio</h1>
          <p className="text-muted-foreground">
            View my complete mechanical engineering portfolio with detailed project descriptions and technical
            specifications.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Options</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/adrin-alias-portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              View PDF in New Tab
            </a>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Preview</h3>
          <div className="w-full h-96 border rounded-lg overflow-hidden">
            <iframe src="/adrin-alias-portfolio.pdf" className="w-full h-full" title="Portfolio Preview" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            If the preview doesn't load, please use the buttons above to view or download the PDF directly.
          </p>
        </div>
      </div>
    </div>
  )
}
