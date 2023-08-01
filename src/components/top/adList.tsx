import { OutlineAd } from "@/types/ads";
import { Box, Card, Fab, Pagination } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import {
  DataGrid,
  GridRowSelectionModel,
  GridRowsProp,
  jaJP,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cols } from "./adCell";
import CreateAdDialog from "../parts/createAdDialog";

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
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [titles, setTitles] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const rows: GridRowsProp = outlines.map((outline) => {
      return {
        id: outline._id,
        title: outline.title,
        img: outline.img,
        imgWidth: outline.img_width,
        imgHeight: outline.img_height,
        time: outline.createtime,
        timeFormat: outline.createtime_format,
        redirectUrl: outline.redirect_url,
        adCompanyName: outline.ad_company_name,
        siteCompanyName: outline.site_company_name,
        siteCompanyUrl: outline.site_company_url,
        position: outline.position,
        analysis: outline.analysis,
      };
    });
    setRows(rows);
  }, [outlines]);

  useEffect(() => {
    setTitles([]);
    const titles_: string[] = [];
    selectionModel.forEach((id) => {
      console.log("id", id);
      const row = rows.find((row) => row.id == id);
      console.log("row", row);
      if (row) {
        titles_.push(row.title);
      }
    });
    setTitles(titles_);
  }, [selectionModel, rows]);

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
        onRowSelectionModelChange={(e) => setSelectionModel(e)}
        rowSelectionModel={selectionModel}
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
      {selectionModel.length > 0 && (
        <Fab
          color="primary"
          variant="extended"
          aria-label="create"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setOpen(true)}
        >
          <CreateIcon sx={{ mr: 1 }} />
          選択した広告から広告を作成
        </Fab>
      )}
      <CreateAdDialog open={open} setOpen={setOpen} titles={titles} />
    </Card>
  );
};

export default AdList;
