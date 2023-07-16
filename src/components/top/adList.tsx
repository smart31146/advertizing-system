import { OutlineAd } from "@/types/ads";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Link,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, jaJP } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/router";

type RowType = {
  id: string;
  title: string;
  img: string;
  time: string;
  timeFormat: string;
  url: string;
  company: string;
  site: string;
  siteName: string;
  position: string;
  analysis: number;
};

type CellType = {
  row: RowType;
};

type AdListProps = {
  outlines: OutlineAd[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageCount: number;
  loading: boolean;
};

const AdList = ({
  outlines,
  page,
  setPage,
  pageCount,
  loading,
}: AdListProps) => {
  const router = useRouter();

  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const rows: GridRowsProp = outlines.map((outline) => {
      return {
        id: outline.id,
        title: outline.title,
        img: outline.img,
        time: outline.createtime,
        timeFormat: outline.createtime_format,
        url: outline.redirect_url,
        company: outline.ad_company,
        site: outline.domain,
        siteName: "サイト名",
        position: "ポジション",
        analysis: outline.analysis,
      };
    });
    setRows(rows);
  }, [outlines]);

  const cols: GridColDef[] = [
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
            <Link href={row.url} target="_blank" underline="none">
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
              {row.company}
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
            <Link href={row.site} underline="none">
              {row.siteName}
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
              <IconButton aria-label="detail" size="small" color="primary">
                <Tooltip title="広告の作成">
                  <CreateIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Box>
        );
      },
    },
  ];

  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          onChange={(_, value) => setPage(value)}
        />
      </Box>
      <DataGrid
        autoHeight
        rows={rows}
        columns={cols}
        rowHeight={100}
        checkboxSelection
        onRowSelectionModelChange={(e) => {
          console.log("selection", e);
        }}
        disableRowSelectionOnClick
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        hideFooter
        loading={loading}
      />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Card>
  );
};

export default AdList;
