import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useRef } from 'react'
import { CSVLink } from 'react-csv'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from "yup"
import { Button, Form, H2, Input, LoginTitle, TextRed } from '../Login/style'
import { DayOffHistoryCol, DayOffHistoryExportButton, DayOffHistoryExportCsv, DayOffHistoryExportLoading, DayOffHistoryWrapper, DayOffHistoryWrapperButton } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import format from 'date-format'
import { exportExcelAction } from '../../stores/slices/dayoffHistory.slice'
import { updateGoogleSheetAction } from '../../stores/slices/googleSheet.slice'
import { getListRoleIdAction } from '../../stores/slices/roleId.slice'

const schema = yup.object().shape({
  DayOffFrom: yup.string()
    .required('Please choose day off from'),
  DayOffTo: yup.string()
    .required('Please choose day off to'),
}).required();

const DayOffHistory = () => {
  const dataExport = useSelector(state => state.exportExcel.exportExcelState);
  const dataUpdate = useSelector(state => state.googleSheet.googleSheetState);
  const roleId = useSelector(state => state.roleId.roleIdState);
  const userInfo = useSelector(state => state.users.userInfoState);

  const dispatch = useDispatch();
  const csvLink = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const newDay = format('dd-MM-yyyy', new Date());
  const dayTime = JSON.stringify(newDay);
  const fileName = `export_dayoff_history_${dayTime}.csv`;
  const csvHeaders = ["No", "Name", "Reason", "DayOffFrom", "DayOffTo", "Type", "Time", "Quanlity", "Status"];
  const csvData = dataExport?.data;
  const loading = dataExport?.loading;
  const updateLoading = dataUpdate?.loading;
  const linkGoogleSheet = "https://docs.google.com/spreadsheets/d/1zR9IZHeMtZN_AgwCsFZKLlM-QVZqEQxz3DvV-k9gJ3E/edit?usp=sharing";

  const roleIdData = roleId?.data;
  const userRoleId = userInfo?.data?.user?.RoleId;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  console.log("🚀 ~ file: index.js:51 ~ DayOffHistory ~ permission", permission)
  
  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);

  const onSubmit = useCallback((value) => {
    dispatch(exportExcelAction(value));
  }, [dispatch])

  const handleExportGoolgeSheet = (data) => {
    dispatch(updateGoogleSheetAction(data));
    setTimeout(openInNewTab, 2000);
  };
  const openInNewTab = () => {
    window.open(linkGoogleSheet, '_blank', 'noopener,noreferrer');
  };
  return (
    <DayOffHistoryCol className='col-sm-9 col-lg-10' onSubmit={handleSubmit(onSubmit)}>
      <Form className='day-off-history_form'>
        <LoginTitle><H2 className='day-off-history_title'>Day Off History</H2></LoginTitle>
        <label>Day off from</label>
        <Input
          {...register("DayOffFrom")}
          type="date"
          placeholder="Enter your email address"
        />
        <TextRed>{errors.DayOffFrom?.message}</TextRed>
        <br />
        <label>Day off to</label>
        <Input
          {...register("DayOffTo")}
          type="date"
          placeholder="Enter your password"
        />
        <TextRed>{errors.DayOffTo?.message}</TextRed>

        <DayOffHistoryWrapper>
          <DayOffHistoryWrapperButton style={{ paddingLeft: "0" }}>
            <Button className='day-off-history_button' type='submit'>
              <DayOffHistoryExportCsv>
                <DayOffHistoryExportLoading>{loading && <FontAwesomeIcon icon={faSpinner} />}</DayOffHistoryExportLoading>
                <DayOffHistoryExportButton>{csvData ? <CSVLink
                  data={csvData.map((item, index) => ({
                    ...item,
                    No: index + 1,
                    DayOffFrom: item.DayOffFrom && format('dd-MM-yyyy', new Date(item?.DayOffFrom)),
                    DayOffTo: item.DayOffTo && format('dd-MM-yyyy', new Date(item?.DayOffTo)),
                  })) ?? []}
                  filename={fileName}
                  className="hidden"
                  ref={csvLink}
                  headers={csvHeaders}
                  enclosingCharacter={``}
                  separator={";"}
                  target="_blank">
                  Export CSV
                </CSVLink> : "Prepare Export CSV"}
                </DayOffHistoryExportButton>
              </DayOffHistoryExportCsv>
            </Button>
          </DayOffHistoryWrapperButton>

          <DayOffHistoryWrapperButton style={{ paddingRight: "0" }}>
            <Button className='day-off-history_button' type='submit' onClick={handleSubmit(handleExportGoolgeSheet)}>
              <DayOffHistoryExportCsv>
                <DayOffHistoryExportLoading>{updateLoading && <FontAwesomeIcon icon={faSpinner} />}</DayOffHistoryExportLoading>
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
