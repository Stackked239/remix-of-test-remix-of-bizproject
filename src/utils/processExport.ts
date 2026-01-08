import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  PageBreak,
} from 'docx';
import { ProcessSetup } from '@/stores/processMapStore';
import { saveAs } from 'file-saver';

export const exportToWord = async (process: ProcessSetup) => {
  const nodes = process.nodes.filter((n) => n.type !== 'start' && n.type !== 'end');
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Page
          new Paragraph({
            text: 'STANDARD OPERATING PROCEDURE',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: process.name,
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: `Department: ${process.department}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Process Owner: ${process.owner}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Last Updated: ${new Date(process.updatedAt).toLocaleDateString()}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Status: ${process.status.charAt(0).toUpperCase() + process.status.slice(1)}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Page Break
          new Paragraph({
            children: [new PageBreak()],
          }),

          // Process Overview
          new Paragraph({
            text: '1. Process Overview',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: 'Purpose:',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: process.purpose || 'No purpose specified.',
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Scope:',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `This SOP covers the ${process.name.toLowerCase()} workflow for the ${process.department} department.`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Frequency: ${process.frequency.replace('-', ' ').charAt(0).toUpperCase() + process.frequency.slice(1).replace('-', ' ')}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Total Steps: ${nodes.length}`,
            spacing: { after: 200 },
          }),

          // Page Break
          new Paragraph({
            children: [new PageBreak()],
          }),

          // Step-by-Step Procedures
          new Paragraph({
            text: '2. Step-by-Step Procedures',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          // Create table for each task
          ...nodes.flatMap((node, index) => [
            new Paragraph({
              text: `Step ${index + 1}: ${node.label}`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: 'Assigned To:', bold: true })] })],
                      width: { size: 30, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ text: node.assignedRole || 'Not assigned' }),
                      ],
                      width: { size: 70, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: 'Duration:', bold: true })] })],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: node.data?.duration
                            ? `${node.data.duration.value} ${node.data.duration.unit}`
                            : 'Not specified',
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: 'Risk Level:', bold: true })] })],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: node.data?.riskLevel
                            ? node.data.riskLevel.charAt(0).toUpperCase() +
                              node.data.riskLevel.slice(1)
                            : 'Not specified',
                        }),
                      ],
                    }),
                  ],
                }),
                ...(node.data?.inputs && node.data.inputs.length > 0
                  ? [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: 'Inputs Required:', bold: true })] })],
                          }),
                          new TableCell({
                            children: node.data.inputs.map(
                              (input) => new Paragraph({ text: `• ${input}` })
                            ),
                          }),
                        ],
                      }),
                    ]
                  : []),
                ...(node.data?.outputs && node.data.outputs.length > 0
                  ? [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: 'Outputs Produced:', bold: true })] })],
                          }),
                          new TableCell({
                            children: node.data.outputs.map(
                              (output) => new Paragraph({ text: `• ${output}` })
                            ),
                          }),
                        ],
                      }),
                    ]
                  : []),
                ...(node.data?.instructions
                  ? [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: 'Instructions:', bold: true })] })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: node.data.instructions })],
                          }),
                        ],
                      }),
                    ]
                  : []),
              ],
            }),
            new Paragraph({ text: '', spacing: { after: 200 } }),
          ]),

          // Page Break
          new Paragraph({
            children: [new PageBreak()],
          }),

          // Roles & Responsibilities
          new Paragraph({
            text: '3. Roles & Responsibilities',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          ...Array.from(new Set(nodes.map((n) => n.assignedRole).filter(Boolean))).map(
            (role) =>
              new Paragraph({
                text: `• ${role}: ${
                  nodes.filter((n) => n.assignedRole === role).length
                } tasks`,
                spacing: { after: 100 },
              })
          ),

          // Footer
          new Paragraph({
            children: [new PageBreak()],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Generated by BizHealth.ai Process Mapping Tools', italics: true })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, italics: true })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${process.name.replace(/[^a-z0-9]/gi, '_')}_SOP.docx`;
  saveAs(blob, fileName);
};
