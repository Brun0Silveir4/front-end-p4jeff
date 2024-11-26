import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useState, useEffect } from "react";
import api from "../../api/api"; // Certifique-se de importar a api corretamente
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  DataTable,
  Loading,
} from "@carbon/react";
import "./index.scss";
import generateEmptyRows from "../../utils/generateEmptyRows";

export default function SpecificItem() {
  const [dates, setDates] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState([]);
  const [media, setMedia] = useState()

  const { day, month, year } = useParams();

  const getDates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/getItemsPerDay/${day}/${month}/${year}`);
      setDates(response.data);
    } catch (err) {
      console.error(err.response?.data?.error || "Erro desconhecido");
      setError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    if (dates?.values) {
      setValues(dates.values);
    }
  }, [dates]);

  useEffect(() => {
    if(dates?.media){
      setMedia(dates.media)
    }
  }, [dates])

  useEffect(() => {
    console.log(values)
    console.log(dates)
  }, [dates]);

  const [currentPageSize, setCurrentPageSize] = useState(8);
  const [firstRowIndex, setFirstRowIndex] = useState(0);

  const currentDataRows = (values || []).slice(
    firstRowIndex,
    firstRowIndex + currentPageSize
  );

  return (
    <div className="container">
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message-specific">
          <p>{error}</p>
        </div>
      ) : (
        <div className="main-content">
          <div className="top-informations">
            <p>Média de temperatura ao longo do dia:</p>
            <p>{media}°C</p>
          </div>

          <div className="table">
            <DataTable
              useZebraStyles
              rows={currentDataRows || []}
              headers={[{ id: "time", key: "hmd" }]}
              render={({ rows, getRowProps }) => (
                <Table aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      <TableHeader>Temperatura</TableHeader>
                      <TableHeader>Umidade</TableHeader>
                      <TableHeader>Data</TableHeader>
                      <TableHeader>Horário</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {rows.map((row, index) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableCell>
                          {currentDataRows[index]?.temp || "N/A"} °C
                        </TableCell>
                        <TableCell>
                          {currentDataRows[index]?.hmd || "N/A"} %
                        </TableCell>
                        <TableCell>
                          {currentDataRows[index]?.date || "N/A"}
                        </TableCell>
                        <TableCell>
                          {currentDataRows[index]?.time || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {rows.length < 4 && generateEmptyRows(8 - rows.length)}
                  </TableBody>
                </Table>
              )}
            />
            <Pagination
              backwardText="Previous page"
              forwardText="Next page"
              itemsPerPageText="Items per page:"
              className="itemPerPage"
              pageNumberText="Page Number"
              onChange={({ page, pageSize }) => {
                if (pageSize !== currentPageSize) {
                  setCurrentPageSize(pageSize);
                }
                setFirstRowIndex(pageSize * (page - 1));
              }}
              pageSize={currentPageSize}
              pageSizes={[8]}
              totalItems={(values || []).length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
