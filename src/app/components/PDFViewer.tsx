import { Download, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  fileName: string;
}

export function PDFViewer({ isOpen, onClose, pdfUrl, title, fileName }: PDFViewerProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.click();
  };

  const handleOpenInNew = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleOpenInNew}>
                <ExternalLink className="size-4 mr-2" />
                Open in New Tab
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-muted/20">
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
            aria-label={title}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Your browser doesn't support embedded PDFs.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleOpenInNew}>
                  <ExternalLink className="size-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="size-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </object>
        </div>
      </DialogContent>
    </Dialog>
  );
}
