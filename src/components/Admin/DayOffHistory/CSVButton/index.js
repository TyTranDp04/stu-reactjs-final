import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Button } from '../../../Login/style'
import { DayOffHistoryExportButton, DayOffHistoryExportCsv, DayOffHistoryExportLoading } from '../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const CSVButton = ({ csvHeaders, csvData, onClick, loadingCSV, ...rest }) => {
  const [disable, setDisable] = useState(false)
  const csvLink = useRef(null)
  if (!csvData) return null

  return (
    <>
      <Button
        onClick={async () => {
          setDisable(true)
          await onClick?.()
          setTimeout(() => {
            csvLink.current?.link.click()
            setDisable(false)
          })
        }}
        disabled={disable}
      >
        <DayOffHistoryExportCsv>
          <DayOffHistoryExportLoading>{loadingCSV && <FontAwesomeIcon icon={faSpinner} />}</DayOffHistoryExportLoading>
          <DayOffHistoryExportButton>Export CSV</DayOffHistoryExportButton>
        </DayOffHistoryExportCsv>
      </Button>

      {csvData && <CSVLink
        data={csvData}
        {...rest}
        headers={csvHeaders}
        className="hidden"
        ref={csvLink}
        enclosingCharacter={``}
        separator={";"}
        target="_blank" />}
    </>
  )
}

export default CSVButton