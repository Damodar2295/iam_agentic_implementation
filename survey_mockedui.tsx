'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ProgressBar,
    Table,
    ListGroup,
    Badge,
    Alert,
    Image,
    Modal,
    Form
} from 'react-bootstrap';
import { CloudUpload, Delete, FileCheck, Info, Zap, CheckCircle, Upload, X, FileText, Image as ImageIcon, File, MessageSquare, Star } from 'lucide-react';
import { AuthGuard } from './components/AuthGuard';

// Define Wells Fargo colors
const wfColors = {
    primary: '#D4001A', // Wells Fargo Red
    primaryLight: '#FF405A',
    primaryDark: '#B30017',
    secondary: '#FFBC0D', // Wells Fargo Gold
    secondaryLight: '#FFD65A',
    secondaryDark: '#E5A800',
    dark: '#1D1D1D',
    light: '#F5F5F7',
    success: '#34C759',
    error: '#D4001A',
    warning: '#FFBC0D',
    compliant: '#e8f5e9', // Light green for compliant status
    nonCompliant: '#ffebee', // Light red for non-compliant status
    partiallyCompliant: '#fff3e0', // Light yellow/orange for partial compliance
    border: '#dee2e6',
    text: '#6E6E73',
    bgLight: '#f8f9fa'
};

// Custom button styles
const primaryButtonStyle = {
    backgroundColor: wfColors.primary,
    borderColor: wfColors.primary,
    color: '#ffffff'
};

const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    borderColor: wfColors.border,
    color: wfColors.dark
};

const Survey: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadComplete, setUploadComplete] = useState<boolean>(false);
    const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analyzingProgress, setAnalyzingProgress] = useState<number>(0);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock LLM analysis results - will be replaced by API call
    const [llmAnalysis, setLlmAnalysis] = useState<any>(null);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

    // Feedback state variables
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
    const [feedbackComment, setFeedbackComment] = useState<string>('');
    const [feedbackRating, setFeedbackRating] = useState<number>(0);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState<boolean>(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

    // Analysis data for different evidence types
    const analysisData = {
        nhaEvidence: {
            observation: "System accounts in application layer show multiple user types with administrative access",
            relevance: "This provides a list of accounts, some of which *could* be NHAs. We need to determine if these are human or non-human",
            analysis: "This image alone doesn't confirm NHA status or compliance. We need to see if these accounts are in eSAR and if their password policies meet requirements"
        },
        esarInventory: {
            observation: "eSAR inventory shows registered service accounts with details about purpose and ownership",
            relevance: "This confirms compliance with eSAR registration requirements for all identified non-human accounts",
            analysis: "The accounts are properly documented in eSAR with required metadata including owner, purpose, and review date"
        },
        passwordComplexity: {
            observation: "Shows the password policy settings within the application. Password Policy enabled with minimum length: 16, password lifetime: 60 days, and composition rules requiring minimum 1 uppercase, 1 lowercase, 1 numeric, 1 special character",
            relevance: "This directly addresses ISCR-315-01 (Password Construction)",
            analysis: "The Password policy meets the minimum complexity requirement of ISCR-315-01 (16 characters, 3 character types)"
        },
        passwordRotation: {
            observation: "Password rotation evidence shows accounts were updated within required timeframes",
            relevance: "This confirms compliance with ISCR-315-11 for password rotation requirements",
            analysis: "All service accounts have passwords rotated within the 60-day requirement. Rotation processes appear to be functioning properly"
        },
        passwordSuspension: {
            observation: "Password suspension policy evidence shows lockout after 5 failed attempts.",
            relevance: "This demonstrates enforcement of account lockout after consecutive failed password attempts, as required.",
            analysis: "The application enforces lockout and password reset after 5 failed attempts, meeting the security requirement."
        }
    };

    // Load analysis data from JSON file
    useEffect(() => {
        const loadAnalysisData = async () => {
            setIsLoadingData(true);
            try {
                const response = await fetch('/data/nha-compliance-assessment.json');
                if (response.ok) {
                    const data = await response.json();
                    setLlmAnalysis(data);
                } else {
                    console.error('Failed to load analysis data');
                }
            } catch (error) {
                console.error('Error loading analysis data:', error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setIsLoadingData(false);
            }
        };

        if (showAnalysis) {
            loadAnalysisData();
        }
    }, [showAnalysis]);

    // Convert file to base64 (based on your implementation)
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                const base64Content = base64String.split(',')[1] || base64String;
                resolve(base64Content);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Convert multiple files to base64
    const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
        const base64Files: string[] = [];

        for (const file of files) {
            const base64 = await fileToBase64(file);
            base64Files.push(base64);
        }

        return base64Files;
    };

    // Upload files function (similar to your backend implementation)
    const uploadFiles = async (files: File[], metadata: any) => {
        try {
            const response = await fetch('/api/v1/evidenceUpload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    files: await convertFilesToBase64(files),
                    metadata: metadata,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Upload Failed');
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            return { success: false, error: errorMessage };
        }
    };

    // Create image preview URLs
    useEffect(() => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const urls = imageFiles.map(file => URL.createObjectURL(file));
        setImagePreviewUrls(urls);

        // Cleanup URLs when component unmounts or files change
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };

    // Handle drag and drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    };

    // Remove file
    const handleDeleteFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Handle file upload
    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);

        const metadata = {
            uploadedBy: 'current-user',
            category: 'iam-evidence',
            description: 'IAM Compliance Evidence Upload'
        };

        // Simulate upload API call
        setTimeout(async () => {
            try {
                // Mock successful upload - replace with actual API call
                setUploadComplete(true);
                setUploading(false);

                // Start analysis after successful upload
                setTimeout(() => {
                    startAnalysis();
                }, 1000);
            } catch (error) {
                setUploading(false);
                alert('Upload failed. Please try again.');
            }
        }, 2000);
    };

    // Start analysis process
    const startAnalysis = () => {
        setIsAnalyzing(true);
        setAnalyzingProgress(0);

        // Simulate analysis progress
        const interval = setInterval(() => {
            setAnalyzingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsAnalyzing(false);
                    setShowAnalysis(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    // Get file icon based on type
    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) {
            return <ImageIcon size={20} color={wfColors.primary} />;
        } else if (fileType.includes('pdf')) {
            return <FileText size={20} color={wfColors.primary} />;
        } else {
            return <File size={20} color={wfColors.primary} />;
        }
    };

    // Get status background color
    const getStatusBackgroundColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'compliant':
                return wfColors.compliant;
            case 'non-compliant':
                return wfColors.nonCompliant;
            case 'partially compliant':
                return wfColors.partiallyCompliant;
            default:
                return wfColors.light;
        }
    };

    // Get status badge style
    const getStatusBadgeStyle = (status: string): any => {
        console.log('Badge status:', status); // Debug log
        const normalizedStatus = status.toLowerCase().trim();

        switch (normalizedStatus) {
            case 'compliant':
                return {
                    backgroundColor: wfColors.success,
                    color: 'white',
                    border: 'none'
                };
            case 'non-compliant':
                return {
                    backgroundColor: wfColors.error,
                    color: 'white',
                    border: 'none'
                };
            case 'partially compliant':
                return {
                    backgroundColor: wfColors.warning,
                    color: wfColors.dark,
                    border: 'none'
                };
            default:
                console.log('Unknown status, using default style for:', status);
                return {
                    backgroundColor: wfColors.light,
                    color: wfColors.dark,
                    border: `1px solid ${wfColors.border}`
                };
        }
    };

    // Download JSON report
    const handleDownloadJson = () => {
        const reportData = {
            timestamp: new Date().toISOString(),
            overallCompliance: llmAnalysis.compliant,
            overallScore: llmAnalysis.overallScore,
            evidenceFiles: files.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified
            })),
            analysisResults: llmAnalysis.recommendations,
            detailedAnalysis: Object.values(analysisData)
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `iam-compliance-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Submit feedback to MongoDB
    const handleSubmitFeedback = async () => {
        if (!feedbackComment.trim() || feedbackRating === 0) {
            alert('Please provide both a rating and comment for your feedback.');
            return;
        }

        setIsSubmittingFeedback(true);

        try {
            const feedbackData = {
                timestamp: new Date().toISOString(),
                analysisId: llmAnalysis?.id || `analysis_${Date.now()}`,
                userId: 'current-user', // Replace with actual user ID from auth
                rating: feedbackRating,
                comment: feedbackComment.trim(),
                analysisResults: {
                    complianceFlag: llmAnalysis?.NHA_Compliance_Assessment?.Compliance_Flag,
                    evidenceCount: files.length,
                    overallAssessment: llmAnalysis?.NHA_Compliance_Assessment?.Summary
                },
                evidenceFiles: files.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type
                })),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const response = await fetch('/api/v1/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            const result = await response.json();
            console.log('Feedback submitted successfully:', result);

            setFeedbackSubmitted(true);
            setShowFeedbackModal(false);

            // Reset feedback form
            setTimeout(() => {
                setFeedbackComment('');
                setFeedbackRating(0);
                setFeedbackSubmitted(false);
            }, 3000);

        } catch (error) {
            console.error('Error submitting feedback:', error instanceof Error ? error.message : 'Unknown error');
            alert('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmittingFeedback(false);
        }
    };

    // Render upload section
    const renderUploadSection = () => (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={10}>
                    <Card className="shadow-sm border-0">
                        <Card.Header
                            className="text-center py-4"
                            style={{ backgroundColor: wfColors.primary, color: 'white' }}
                        >
                            <h2 className="mb-0">
                                <Upload size={32} className="me-2" />
                                IAM Compliance Evidence Upload
                            </h2>
                            <p className="mb-0 mt-2">Upload all your IAM compliance evidence files at once</p>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {/* Upload Instructions */}
                            <Alert variant="info" className="mb-4">
                                <Info size={20} className="me-2" />
                                <strong>What to Upload:</strong>
                                <ul className="mb-0 mt-2">
                                    <li>NHA Evidence (screenshots, exports, documentation)</li>
                                    <li>eSAR Inventory records</li>
                                    <li>Password Complexity configuration</li>
                                    <li>Password Rotation logs/evidence</li>
                                    <li>Password Suspension policy documentation</li>
                                </ul>
                            </Alert>

                            {/* Drag and Drop Area */}
                            <div
                                className={`border-2 border-dashed rounded p-5 text-center mb-4 ${dragActive ? 'border-primary bg-light' : 'border-secondary'
                                    }`}
                                style={{
                                    borderColor: dragActive ? wfColors.primary : wfColors.border,
                                    backgroundColor: dragActive ? wfColors.light : 'transparent',
                                    cursor: 'pointer'
                                }}
                                onClick={() => fileInputRef.current?.click()}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    accept="image/*,.pdf,.doc,.docx"
                                />

                                <CloudUpload size={48} color={wfColors.primary} className="mb-3" />
                                <h5>Drop files here or click to browse</h5>
                                <p className="text-muted mb-0">
                                    Supported formats: Images (JPG, PNG, GIF), PDF, Word Documents
                                </p>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="mb-4">
                                    <h6 className="mb-3">Selected Files ({files.length})</h6>
                                    <ListGroup>
                                        {files.map((file, index) => (
                                            <ListGroup.Item
                                                key={index}
                                                className="d-flex justify-content-between align-items-center"
                                                style={{ borderColor: wfColors.border }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    {getFileIcon(file.type)}
                                                    <div className="ms-2">
                                                        <div style={{ color: wfColors.dark }}>{file.name}</div>
                                                        <small style={{ color: wfColors.text }}>
                                                            {(file.size / 1024).toFixed(2)} KB
                                                        </small>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => handleDeleteFile(index)}
                                                >
                                                    <Delete size={16} />
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}

                            {/* Upload Button */}
                            <div className="text-center">
                                <Button
                                    style={primaryButtonStyle}
                                    size="lg"
                                    onClick={handleUpload}
                                    disabled={files.length === 0 || uploading}
                                    className="px-5"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} className="me-2" />
                                            Upload & Analyze Evidence
                                        </>
                                    )}
                                </Button>
                            </div>

                            {uploadComplete && !isAnalyzing && !showAnalysis && (
                                <Alert variant="success" className="mt-4">
                                    <CheckCircle size={20} className="me-2" />
                                    Files uploaded successfully! Analysis will begin shortly...
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    // Render analyzing view
    const renderAnalyzingView = () => (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body className="p-5">
                            <div className="mb-4">
                                <Zap size={64} color={wfColors.primary} className="mb-3" />
                                <h3>Analyzing Evidence</h3>
                                <p className="text-muted">
                                    AI is processing your uploaded evidence files...
                                </p>
                            </div>

                            <ProgressBar
                                now={analyzingProgress}
                                style={{ height: '12px' }}
                                className="mb-3"
                            />
                            <p className="small text-muted">
                                {analyzingProgress}% Complete
                            </p>

                            <div className="mt-4 p-3 bg-light rounded">
                                <small className="text-muted">
                                    Processing {files.length} files for compliance validation...
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    // Render analysis results with DataGrid-style layout
    const renderAnalysisResults = () => {
        if (!llmAnalysis || isLoadingData) {
            return (
                <Container className="mt-4">
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="shadow-sm border-0 text-center">
                                <Card.Body className="p-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3">Loading analysis results...</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }

        const assessment = llmAnalysis.NHA_Compliance_Assessment;

        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col lg={12}>
                        {/* Header */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header
                                className="text-center py-4"
                                style={{ backgroundColor: wfColors.primary, color: 'white' }}
                            >
                                <CheckCircle size={32} className="me-2" />
                                <h2 className="mb-0">NHA Compliance Assessment Complete</h2>
                                <p className="mb-0 mt-2">
                                    Status: <strong>{assessment.Compliance_Flag}</strong>
                                </p>
                            </Card.Header>
                        </Card>

                        {/* Introduction */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Body>
                                <h5 className="mb-3">
                                    <Info size={20} className="me-2 text-primary" />
                                    Assessment Introduction
                                </h5>
                                <p className="text-muted mb-0">{assessment.Introduction}</p>
                            </Card.Body>
                        </Card>

                        {/* Evidence Analysis - DataGrid Style */}
                        {assessment.Evidence_Analysis.map((evidence: any, index: number) => (
                            <Card key={evidence.questionId} className="shadow-sm border-0 mb-4">
                                <Card.Header
                                    className="d-flex justify-content-end align-items-center py-3"
                                    style={{
                                        backgroundColor: wfColors.light,
                                        color: wfColors.dark
                                    }}
                                >
                                    <span
                                        style={{
                                            ...getStatusBadgeStyle(evidence.status),
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {evidence.status}
                                    </span>
                                </Card.Header>

                                <Card.Body className="p-0">
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', minHeight: '200px' }}>
                                        {/* Evidence Column */}
                                        <div className="p-3 border-end" style={{ backgroundColor: '#f8f9fa' }}>
                                            <h6 className="fw-bold mb-3" style={{ color: wfColors.dark }}>Evidence</h6>
                                            <div className="text-center">
                                                {evidence.evidence.hasImage ? (
                                                    <div>
                                                        <ImageIcon size={48} className="mb-2" style={{ color: wfColors.primary }} />
                                                        <p className="small mb-0" style={{ color: wfColors.text }}>
                                                            {evidence.evidence.fileName}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <FileCheck size={48} className="mb-2 text-muted" />
                                                        <p className="small mb-0 text-muted">
                                                            {evidence.evidence.fileName}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Observation Column */}
                                        <div className="p-3 border-end">
                                            <h6 className="fw-bold mb-3" style={{ color: wfColors.dark }}>Observation</h6>
                                            <p className="small mb-0" style={{ color: wfColors.text, lineHeight: '1.4' }}>
                                                {evidence.observation}
                                            </p>
                                        </div>

                                        {/* Relevance Column */}
                                        <div className="p-3 border-end">
                                            <h6 className="fw-bold mb-3" style={{ color: wfColors.dark }}>Relevance</h6>
                                            <p className="small mb-0" style={{ color: wfColors.text, lineHeight: '1.4' }}>
                                                {evidence.relevance}
                                            </p>
                                        </div>

                                        {/* Analysis Column */}
                                        <div className="p-3">
                                            <h6 className="fw-bold mb-3" style={{ color: wfColors.dark }}>Analysis</h6>
                                            <p className="small mb-0" style={{ color: wfColors.text, lineHeight: '1.4' }}>
                                                {evidence.analysis}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                        {/* Survey Questions Summary */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header>
                                <h5 className="mb-0">
                                    <FileCheck size={20} className="me-2" />
                                    Addressing Specific Survey Questions
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table responsive className="mb-0">
                                    <thead style={{ backgroundColor: wfColors.light }}>
                                        <tr>
                                            <th style={{ color: wfColors.dark, padding: '15px', width: '30%' }}>Survey Question</th>
                                            <th style={{ color: wfColors.dark, padding: '15px', width: '50%' }}>Response Based on Images</th>
                                            <th style={{ color: wfColors.dark, padding: '15px', width: '20%' }}>Evidence Reference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assessment.Addressing_Specific_Survey_Questions.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td className="p-3">
                                                    <strong style={{ color: wfColors.dark }}>{item.Survey_Question}</strong>
                                                </td>
                                                <td className="p-3" style={{ color: wfColors.text }}>
                                                    {item.Response_Based_on_Images}
                                                </td>
                                                <td className="p-3">
                                                    <Badge style={{ color: wfColors.text, border: `1px solid ${wfColors.border}`, backgroundColor: 'transparent' }}>
                                                        {item.Evidence_Reference}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        {/* Summary and Recommendations */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header>
                                <h5 className="mb-0">
                                    <Zap size={20} className="me-2" />
                                    Summary & Recommendations
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-8">
                                        <h6 className="fw-bold mb-2">Summary</h6>
                                        <p style={{ color: wfColors.text, lineHeight: '1.6' }}>{assessment.Summary}</p>

                                        <h6 className="fw-bold mb-2 mt-4">Justification</h6>
                                        <p style={{ color: wfColors.text, lineHeight: '1.6' }}>{assessment.Justification}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="fw-bold mb-2">Recommended Actions</h6>
                                        <ul className="list-unstyled">
                                            {assessment.Recommended_Actions.map((action: string, index: number) => (
                                                <li key={index} className="mb-2 d-flex align-items-start">
                                                    <CheckCircle size={16} className="me-2 mt-1 text-primary flex-shrink-0" />
                                                    <span className="small" style={{ color: wfColors.text }}>{action}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Evidence Preview */}
                        {imagePreviewUrls.length > 0 && (
                            <Card className="shadow-sm border-0 mb-4">
                                <Card.Header>
                                    <h5 className="mb-0">
                                        <ImageIcon size={20} className="me-2" />
                                        Uploaded Evidence Preview
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        {imagePreviewUrls.map((url, index) => (
                                            <Col md={4} key={index} className="mb-3">
                                                <Image
                                                    src={url}
                                                    alt={`Evidence ${index + 1}`}
                                                    thumbnail
                                                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}

                        {/* Action Buttons */}
                        <div className="text-center mb-4">
                            <Button
                                style={primaryButtonStyle}
                                size="lg"
                                onClick={handleDownloadJson}
                                className="me-3"
                            >
                                <FileText size={20} className="me-2" />
                                Download Report
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: wfColors.secondary,
                                    borderColor: wfColors.secondary,
                                    color: wfColors.dark
                                }}
                                size="lg"
                                onClick={() => setShowFeedbackModal(true)}
                                className="me-3"
                            >
                                <MessageSquare size={20} className="me-2" />
                                Provide Feedback
                            </Button>
                            <Button
                                style={secondaryButtonStyle}
                                size="lg"
                                onClick={() => window.location.reload()}
                            >
                                Start New Analysis
                            </Button>
                        </div>

                        {/* Feedback Success Alert */}
                        {feedbackSubmitted && (
                            <Alert variant="success" className="text-center mb-4">
                                <CheckCircle size={20} className="me-2" />
                                Thank you for your feedback! Your input helps us improve our analysis.
                            </Alert>
                        )}

                        {/* Feedback Modal */}
                        <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} size="lg" centered>
                            <Modal.Header closeButton style={{ backgroundColor: wfColors.light }}>
                                <Modal.Title>
                                    <MessageSquare size={24} className="me-2" style={{ color: wfColors.primary }} />
                                    Provide Feedback on Analysis
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-4">
                                <Form>
                                    {/* Rating Section */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold mb-3">
                                            How would you rate the accuracy of this analysis?
                                        </Form.Label>
                                        <div className="d-flex align-items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={32}
                                                    className="me-2"
                                                    style={{
                                                        color: star <= feedbackRating ? wfColors.secondary : wfColors.border,
                                                        fill: star <= feedbackRating ? wfColors.secondary : 'transparent',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setFeedbackRating(star)}
                                                />
                                            ))}
                                            <span className="ms-3 text-muted">
                                                {feedbackRating > 0 && (
                                                    <>
                                                        {feedbackRating} of 5 stars
                                                        {feedbackRating === 1 && ' - Poor'}
                                                        {feedbackRating === 2 && ' - Fair'}
                                                        {feedbackRating === 3 && ' - Good'}
                                                        {feedbackRating === 4 && ' - Very Good'}
                                                        {feedbackRating === 5 && ' - Excellent'}
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </Form.Group>

                                    {/* Comment Section */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold">
                                            Please provide specific feedback about the analysis:
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Share your thoughts on the analysis accuracy, missing elements, suggestions for improvement, or any other feedback..."
                                            value={feedbackComment}
                                            onChange={(e) => setFeedbackComment(e.target.value)}
                                            style={{ borderColor: wfColors.border }}
                                        />
                                        <Form.Text className="text-muted">
                                            Your feedback helps us improve our AI analysis capabilities.
                                        </Form.Text>
                                    </Form.Group>

                                    {/* Analysis Summary for Reference */}
                                    <div className="p-3 rounded" style={{ backgroundColor: wfColors.light }}>
                                        <h6 className="fw-bold mb-2">Analysis Summary (for reference):</h6>
                                        <p className="small mb-1">
                                            <strong>Compliance Status:</strong> {llmAnalysis?.NHA_Compliance_Assessment?.Compliance_Flag}
                                        </p>
                                        <p className="small mb-1">
                                            <strong>Evidence Files:</strong> {files.length} files analyzed
                                        </p>
                                        <p className="small mb-0">
                                            <strong>Analysis Date:</strong> {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: wfColors.light }}>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowFeedbackModal(false)}
                                    disabled={isSubmittingFeedback}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={primaryButtonStyle}
                                    onClick={handleSubmitFeedback}
                                    disabled={isSubmittingFeedback || !feedbackComment.trim() || feedbackRating === 0}
                                >
                                    {isSubmittingFeedback ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={16} className="me-2" />
                                            Submit Feedback
                                        </>
                                    )}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        );
    };

    // Main render logic
    if (showAnalysis) {
        return renderAnalysisResults();
    }

    if (isAnalyzing) {
        return renderAnalyzingView();
    }

    return renderUploadSection();
};

export default function SecuredSurvey() {
    return (
        <AuthGuard>
            <Survey />
        </AuthGuard>
    );
} 