import React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { getCharacters, getCharacterById, Character, CharactersResponse } from '../api/rickAndMortyApi';
import HeroDetail from './HeroDetail';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 300, flex: 1 },
  { field: 'status', headerName: 'Status', width: 180 },
];

export default function Heroes() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();


  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
  });

 
  const {
    data: charactersData,
    loading: listLoading,
    error: listError,
  } = useRequest<CharactersResponse>(
    () => getCharacters(paginationModel.page + 1),
    {
      refreshDeps: [paginationModel.page],
      
    }
  );


 const {
  data: selectedCharacter,
  loading: detailLoading,
  error: detailError,
  run: runDetailRequest,  
} = useRequest<Character, [number]>(
  (charId: number) => getCharacterById(charId),
  {
    manual: true,  
   
  }
);
React.useEffect(() => {
  if (id) {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      runDetailRequest(numericId);
    }
  }
}, [id, runDetailRequest]);


console.log('Зміна id:', id);
console.log('selectedCharacter:', selectedCharacter);
  const handleRowClick = (params: GridRowParams<Character>) => {
    navigate(`/heroes/${params.row.id}`);
  };

  const characters = charactersData?.results ?? [];
  const totalCount = charactersData?.info.count ?? 0;

  return (
    <div className="heroes-page" style={{ display: 'flex', height: '100vh' }}>
      
      <div className="list-container" style={{ flex: 1, padding: 20, overflow: 'auto' }}>
        <h1>Персонажі Rick and Morty</h1>

        {listError && <p style={{ color: 'red' }}>Помилка завантаження списку: {listError.message}</p>}

        <div style={{ height: 'calc(100vh - 140px)', width: '100%' }}>
          <DataGrid
            rows={characters}
            columns={columns}
            rowCount={totalCount}
            loading={listLoading}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            onRowClick={handleRowClick}
            getRowId={(row) => row.id}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#0f4972',
                cursor: 'pointer',
              },
              border: 'none',
            }}
          />
        </div>
      </div>

      
      <div
        className="detail-container"
        style={{
          width: 420,
          padding: 20,
          background: '#f8f9fa',
          borderLeft: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        {id ? (
          <>
            {detailLoading && (
              <p style={{ textAlign: 'center', padding: 40 }}>Завантаження деталей персонажа...</p>
            )}

            {detailError && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                Помилка: {detailError.message}
              </p>
            )}

            {selectedCharacter ? (
              <HeroDetail character={selectedCharacter} />
            ) : (
              !detailLoading && <p style={{ textAlign: 'center' }}>Персонажа не знайдено</p>
            )}
          </>
        ) : (
          <div
            className="placeholder"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
            }}
          >
            <p>Оберіть персонажа зі списку</p>
          </div>
        )}
      </div>
    </div>
  );
}