import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import format from 'date-format'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
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

  const userRoleId = userInfo?.data?.RoleId;
  const roleIdData = roleId?.data;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  const loading = googleSheetData?.loading;

  useEffect(() => {
    if (!permission) {
      return
    } else if (permission !== "Admin") {
      navigate("/404")
    } else {
      navigate("/admin/day-off-history")
    }
  }, [permission, navigate]);

  const newDay = format('dd-MM-yyyy', new Date());
  const dayTime = JSON.stringify(newDay);
  const fileName = `export_day_off_history_${dayTime}.csv`;
  const csvHeaders = ["No", "Name", "Reason", "DayOffFrom", "DayOffTo", "Type", "Time", "Quantity", "Status"];

  const linkGoogleSheet = `https://docs.google.com/spreadsheets/d/${dayOff.idGooleSheets}/edit#gid=0`;
  const URL = process.env.REACT_APP_URL_WEBSITE;

  const handleExportCSV = async () => {
    const allDayOff = await axios.get(`${URL}/export?DayOffFrom=${dayOff.dayOffFrom}&DayOffTo=${dayOff.dayOffTo}`)
    let csvDataResponse = allDayOff?.data;
    setCsvData(csvDataResponse);
  }

  const handleExportGoogleSheet = () => {
    if (dayOff.dayOffFrom === '' || dayOff.dayOffTo === '') {
      Swal.fire({
        text: "Please select a day to export !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
    } else if (dayOff.dayOffFrom > dayOff.dayOffTo) {
      Swal.fire({
        text: "Day Off From can't be bigger than Day Off To !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
    } else if (dayOff.idGooleSheets === '' || dayOff.idGooleSheets.length !== 44) {
      Swal.fire({
        text: "Your ID Google Sheets is invalid !!!",
        icon: 'warning',
        confirmButtonColor: '#8000FF',
        confirmButtonText: 'OK'
      })
    } else {
      dispatch(updateGoogleSheetAction(dayOff));
      setTimeout(openInNewTab, 2000)
    }
  };

  const openInNewTab = () => {
    window.open(linkGoogleSheet, '_blank', 'noopener,noreferrer');
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
        <TextRed></TextRed>
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
        <TextRed></TextRed>
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
                dayOff={dayOff}
                onClick={handleSubmit(handleExportCSV)}
              />
            </DayOffHistoryExportButton>
          </DayOffHistoryWrapperButton>

          <DayOffHistoryWrapperButton style={{ paddingRight: "0" }}>
            <Button className='day-off-history_button' type='submit' onClick={handleSubmit(handleExportGoogleSheet)}>
              <DayOffHistoryExportCsv>
                <DayOffHistoryExportLoading>{loading && <FontAwesomeIcon icon={faSpinner} />}</DayOffHistoryExportLoading>
                <DayOffHistoryExportButton>Export Google Sheet</DayOffHistoryExportButton>
              </DayOffHistoryExportCsv>
            </Button>
          </DayOffHistoryWrapperButton>
        </DayOffHistoryWrapper>
        <ToastContainer
          style={{ display: "block", position: "fixed", zIndex: "99999" }}
          autoClose={1000}
        />
      </Form>
    </DayOffHistoryCol>
  )
}

export default DayOffHistory
