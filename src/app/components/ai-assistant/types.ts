export interface CitationRef {
  id: string;
  file_id: string;
  file: string;
  page: number | null;
  timestamp: string | null;
  speakers: string[] | null;
  label: string;
  score?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: CitationRef[];
  pending?: boolean;
}

export interface IngestStatusSnapshot {
  indexed: number;
  processing: string[];
  queued: string[];
  failed: { file: string; reason: string; attempts: number }[];
  last_scan: string | null;
}
