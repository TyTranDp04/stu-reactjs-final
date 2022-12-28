import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import format from 'date-format'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URL_API } from '../../../api/const.api'
import { updateGoogleSheetAction } from '../../../stores/slices/googleSheet.slice'
import { Button, Form, H2, Input, LoginTitle, TextRed } from '../../Login/style'
import CSVButton from './CSVButton'
import { DayOffHistoryCol, DayOffHistoryExportButton, DayOffHistoryExportCsv, DayOffHistoryExportLoading, DayOffHistoryWrapper, DayOffHistoryWrapperButton } from './style'

const DayOffHistory = () => {
  const googleSheetData = useSelector(state => state.googleSheet.googleSheetState);
  const userInfo = useSelector(state => state.users.userInfoState);
  const roleId = useSelector(state => state.roleId.roleIdState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
  } = useForm();

  const [dayOff, setDayOff] = useState({
    dayOffFrom: "",
    dayOffTo: "",
    idGooleSheets: "",
  });
  const [csvData, setCsvData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [disableGS, setDisableGS] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loading, setLoading] = useState(false);
  const userRoleId = userInfo?.data?.RoleId;
  const roleIdData = roleId?.data;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  const error = googleSheetData?.data;
  const loadingGS = googleSheetData?.loading;

  useEffect(() => {
    if (!permission) {
      return
    } else if (permission !== "Admin") {
      navigate("/404")
    } else {
      navigate("/admin/day-off-history")
    }
  }, [permission, navigate]);

  useEffect(() => {
    if (dayOff.dayOffFrom === '' || dayOff.dayOffTo === '' || dayOff.dayOffFrom > dayOff.dayOffTo) {
      Swal.fire({
        text: "Day Off From, Day Off To is required and Day Off From can't be bigger than Day Off To !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [dayOff.dayOffFrom, dayOff.dayOffTo])

  useEffect(() => {
    dispatch(updateGoogleSheetAction(dayOff));
  }, [dayOff.idGooleSheets, dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        text: "Your ID Google Sheets isn't conrrect or Google Sheets don't be shared anyone with the link !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
      setDisableGS(true)
    } else {
      setDisableGS(false)
    }
  }, [error]);

  const dayFrom = format('dd-MM-yyyy', new Date(dayOff.dayOffFrom));
  const dayTo = format('dd-MM-yyyy', new Date(dayOff.dayOffTo));
  
  const fileName = `export_day_off_history_${dayFrom}-${dayTo}.csv`;
  const csvHeaders = ["No", "Name", "Reason", "DayOffFrom", "DayOffTo", "Type", "Time", "Quantity"];

  const linkGoogleSheet = `https://docs.google.com/spreadsheets/d/${dayOff.idGooleSheets}/edit#gid=0`;

  const handleExportCSV = async () => {
    setLoadingCSV(true);
    const allDayOff = await axios.get(`${URL_API}/export?DayOffFrom=${dayOff.dayOffFrom}&DayOffTo=${dayOff.dayOffTo}`)
    let csvDataResponse = allDayOff?.data;
    setCsvData(csvDataResponse);
    setLoadingCSV(false);
  }

  const handleExportGoogleSheet = () => {
    if (dayOff.dayOffFrom === '' || dayOff.dayOffTo === '' || dayOff.dayOffFrom > dayOff.dayOffTo) {
      Swal.fire({
        text: "Day Off From, Day Off To is required and Day Off From can't be bigger than Day Off To !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
    } else {
      setLoading(true);
      window.open(linkGoogleSheet, '_blank', 'noopener,noreferrer');
      setLoading(false);
    }
  };

  return (
    <DayOffHistoryCol>
      <Form className='day-off-history_form'>
        <LoginTitle style={{ paddingBottom: "20px" }}><H2 className='day-off-history_title'>Day Off History</H2></LoginTitle>
        <label>Day off from</label>
        <Input
          value={dayOff.dayOffFrom}
          onChange={e => setDayOff({
            ...dayOff,
            dayOffFrom: e.target.value
          })}
          type="date"
        />
        <br />
        <label>Day off to</label>
        <Input
          value={dayOff.dayOffTo}
          onChange={e => setDayOff({
            ...dayOff,
            dayOffTo: e.target.value
          })}
          type="date"
        />
        <br />
        <label>ID Google Sheets</label>
        <Input
          value={dayOff.idGooleSheets}
          onChange={e => setDayOff({
            ...dayOff,
            idGooleSheets: e.target.value
          })}
          type="text"
          placeholder="Enter this field to export Google Sheets"
        />
        <DayOffHistoryWrapper>
          <DayOffHistoryWrapperButton style={{ paddingLeft: "0" }}>
            <DayOffHistoryExportButton>
              {disable ?
                <Button className='day-off-history_button' style={{ opacity: disable && "0.4" }} disabled={disable}>
                  <DayOffHistoryExportCsv>
                    <DayOffHistoryExportButton>Export CSV</DayOffHistoryExportButton>
                  </DayOffHistoryExportCsv>
                </Button> :
                <CSVButton
                  csvData={csvData?.map((item, index) => ({
                    ...item,
                    No: index + 1,
                    DayOffFrom: item?.DayOffFrom && format('dd-MM-yyyy', new Date(item?.DayOffFrom)),
                    DayOffTo: item?.DayOffTo && format('dd-MM-yyyy', new Date(item?.DayOffTo)),
                    Type: item?.Type === 1 ? "OFF" : "WFH"
                  }))}
                  filename={fileName}
                  csvHeaders={csvHeaders}
                  loadingCSV={loadingCSV}
                  onClick={handleSubmit(handleExportCSV)}
                />}
            </DayOffHistoryExportButton>
          </DayOffHistoryWrapperButton>
          <DayOffHistoryWrapperButton style={{ paddingRight: "0" }}>
            <Button className='day-off-history_button' type='submit' onClick={handleSubmit(handleExportGoogleSheet)} disabled={disableGS} style={{ opacity: disableGS && "0.4" }}>
              <DayOffHistoryExportCsv>
                <DayOffHistoryExportLoading>{(loading || loadingGS) && <FontAwesomeIcon icon={faSpinner} />}</DayOffHistoryExportLoading>
                <DayOffHistoryExportButton>Export Google Sheet</DayOffHistoryExportButton>
              </DayOffHistoryExportCsv>
            </Button>
          </DayOffHistoryWrapperButton>
        </DayOffHistoryWrapper>
      </Form>
    </DayOffHistoryCol>
  )
}

export default DayOffHistory
