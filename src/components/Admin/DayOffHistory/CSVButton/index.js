import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Button } from '../../../Login/style'

const CSVButton = ({ csvHeaders, csvData, onClick, dayOff, ...rest }) => {
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
      >Export CSV </Button>

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