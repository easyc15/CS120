import { useState } from "react";
import { FileText, Search, Download, ExternalLink, BookOpen } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PDFViewer } from "./PDFViewer";

// Import PDFs
import module1 from "../../imports/CS120_Module1_DigitalCitizenship.pdf";
import module2 from "../../imports/CS120_Module2_Foundations.pdf";
import module3 from "../../imports/CS120_Module3_NumberSystems.pdf";
import module4 from "../../imports/CS120_Module4_ComputerHardware.pdf";
import module5 from "../../imports/CS120_Module5_InputOutput.pdf";
import module6 from "../../imports/CS120_Module6_ComputerStorage.pdf";

interface Document {
  id: number;
  title: string;
  module: string;
  description: string;
  fileName: string;
  filePath: string;
  topics: string[];
}

const documents: Document[] = [
  {
    id: 1,
    title: "Digital Citizenship",
    module: "Module 1",
    description: "Introduction to digital citizenship, online safety, and responsible technology use",
    fileName: "CS120_Module1_DigitalCitizenship.pdf",
    filePath: module1,
    topics: ["Digital Ethics", "Online Safety", "Privacy"],
  },
  {
    id: 2,
    title: "Foundations",
    module: "Module 2",
    description: "Fundamental concepts of computer science and computational thinking",
    fileName: "CS120_Module2_Foundations.pdf",
    filePath: module2,
    topics: ["Computer Science Basics", "Algorithms", "Problem Solving"],
  },
  {
    id: 3,
    title: "Number Systems",
    module: "Module 3",
    description: "Binary, decimal, hexadecimal and other number systems in computing",
    fileName: "CS120_Module3_NumberSystems.pdf",
    filePath: module3,
    topics: ["Binary", "Hexadecimal", "Data Representation"],
  },
  {
    id: 4,
    title: "Computer Hardware",
    module: "Module 4",
    description: "Overview of computer hardware components and architecture",
    fileName: "CS120_Module4_ComputerHardware.pdf",
    filePath: module4,
    topics: ["CPU", "Memory", "Architecture"],
  },
  {
    id: 5,
    title: "Input & Output",
    module: "Module 5",
    description: "Input and output devices, peripherals, and user interaction",
    fileName: "CS120_Module5_InputOutput.pdf",
    filePath: module5,
    topics: ["I/O Devices", "Peripherals", "User Interface"],
  },
  {
    id: 6,
    title: "Computer Storage",
    module: "Module 6",
    description: "Storage devices, memory hierarchy, and data persistence",
    fileName: "CS120_Module6_ComputerStorage.pdf",
    filePath: module6,
    topics: ["Storage", "Memory", "Data Persistence"],
  },
];

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="size-8 text-primary" />
            <div>
              <h1 className="font-semibold">CS120 Document Library</h1>
              <p className="text-sm text-muted-foreground">Access your course materials anytime, anywhere</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by module, title, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="rounded-lg border bg-card p-4 flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="font-semibold">{documents.length} Modules</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <Search className="size-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Search Results</p>
                <p className="font-semibold">{filteredDocuments.length} Found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No documents found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{doc.module}</Badge>
                    <FileText className="size-5 text-muted-foreground" />
                  </div>
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {doc.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    onClick={() => handleView(doc)}
                    className="flex-1"
                    variant="default"
                  >
                    <ExternalLink className="size-4 mr-2" />
                    View PDF
                  </Button>
                  <Button
                    onClick={() => handleDownload(doc.filePath, doc.fileName)}
                    variant="outline"
                    size="icon"
                  >
                    <Download className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">For AI Tools & Assistants</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These documents are publicly accessible via their direct URLs. You can share the document links with AI assistants to help them access and analyze the content.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            {documents.map((doc) => (
              <div key={doc.id} className="font-mono bg-muted p-2 rounded">
                {doc.module}: {doc.fileName}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* PDF Viewer Modal */}
      {selectedDoc && (
        <PDFViewer
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          pdfUrl={selectedDoc.filePath}
          title={`${selectedDoc.module}: ${selectedDoc.title}`}
          fileName={selectedDoc.fileName}
        />
      )}
    </div>
  );
}