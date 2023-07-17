import {
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { GridColDef } from "@mui/x-data-grid";
import router from "next/router";
import AdCreateButton from "./adCreateButton";
import { AdPositions } from "@/types/ads";

type RowType = {
  id: string;
  title: string;
  img: string;
  imgWidth: number;
  imgHeight: number;
  time: string;
  timeFormat: string;
  redirectUrl: string;
  adCompanyName: string;
  siteCompanyName: string;
  siteCompanyUrl: string;
  position: AdPositions;
  analysis: number;
};

type CellType = {
  row: RowType;
};

export const cols: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 150,
    field: "img",
    headerName: "",
    align: "center",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ height: 100, display: "flex", justifyContent: "center" }}>
          <img
            src={row.img}
            alt={row.title}
            height="100%"
            width="100%"
            style={{ objectFit: "contain", display: "block" }}
          />
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "time",
    headerName: "",
    align: "center",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Chip label={row.timeFormat} size="small" />
        </Box>
      );
    },
  },
  {
    flex: 0.4,
    minWidth: 300,
    field: "title",
    headerName: "広告文章",
    renderCell: ({ row }: CellType) => {
      return (
        <Box>
          <Link href={row.redirectUrl} target="_blank" underline="none">
            <Typography
              variant="body1"
              component="p"
              sx={{ width: "100%", wordWrap: "break-word" }}
            >
              {row.title}
            </Typography>
          </Link>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "company",
    headerName: "広告会社",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" component="p">
            {row.adCompanyName}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: "site",
    headerName: "掲載サイト",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={row.siteCompanyUrl} underline="none">
            {row.siteCompanyName}
          </Link>
        </Box>
      );
    },
  },
  {
    flex: 0.05,
    minWidth: 80,
    field: "analysis",
    headerName: "表示回数",
    align: "right",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" component="p">
            {row.analysis}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.05,
    minWidth: 80,
    field: "",
    headerName: "",
    align: "center",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack>
            <IconButton
              aria-label="detail"
              size="small"
              color="primary"
              onClick={() => router.push(`/detail/${row.id}`)}
            >
              <Tooltip title="詳細">
                <AssessmentIcon />
              </Tooltip>
            </IconButton>
            <AdCreateButton title={row.title} />
          </Stack>
        </Box>
      );
    },
  },
];
