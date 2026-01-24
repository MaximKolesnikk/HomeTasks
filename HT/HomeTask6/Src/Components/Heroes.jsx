import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import HeroDetail from "./HeroDetail.jsx";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 300, flex: 1 },
  { field: "status", headerName: "Status", width: 180 },
];

export default function Heroes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [rowCount, setRowCount] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const page = paginationModel.page + 1;
        const url = `https://rickandmortyapi.com/api/character?page=${page}`;

        const response = await axios.get(url);

        setCharacters(response.data.results);
        setRowCount(response.data.info.count);
        setLoading(false);
      } catch (err) {
        setError("Помилка завантаження персонажів");
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [paginationModel.page, paginationModel.pageSize]);

  const handleRowClick = (params) => {
    navigate(`/heroes/${params.row.id}`);
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };

  return (
    <div className="heroes-page">
      <div className="list-container">
        <h1>Персонажі Rick and Morty</h1>
        {error && <p className="error">{error}</p>}

        <div style={{ height: "calc(100vh - 140px)", width: "100%" }}>
          <DataGrid
            rows={characters}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={[10, 20, 50]}
            onRowClick={handleRowClick}
            getRowId={(row) => row.id}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e3f2fd",
                cursor: "pointer",
              },
              border: "none",
            }}
          />
        </div>
      </div>

      <div className="detail-container">
        {id ? (
          <HeroDetail />
        ) : (
          <div className="placeholder">
            <p>Оберіть персонажа зі списку</p>
          </div>
        )}
      </div>
    </div>
  );
}
