export interface Request {
  id: string;
  accountId?: string;
  protocol: string;
  cpf: string;
  email: string;
  address: string;
  latitude: string;
  longitude: string;
  name: string;
  contact: string;
  activity: "CLEANING" | "TREE" | "CONSTRUCTION" | "GROUND";
  priority: "LOW" | "HIGH";
  status:
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  description?: string;
  addressFormatted: string;
  geocodeStatus: "PENDING" | "DONE" | "FAILED";
  geocodeProvider: string;
  geocodeRelevance: number;
  geocodedAt: Date;
  geocodeError?: string;
  insideCity?: boolean;
  orderDate: Date;
  deliveryDate: Date;
  estimatedEndDate: Date;
  completionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CpfRankingItem {
  cpf: string;
  total: number;
  requests: Request[];
}

export interface AddressRankingItem {
  address: string;
  total: number;
  requests: Request[];
}

export interface AbuseReportResponse {
  rankingCpf: CpfRankingItem[];
  rankingAddress: AddressRankingItem[];
}
