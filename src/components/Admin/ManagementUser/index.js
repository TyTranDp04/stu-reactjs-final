import React, { Component } from "react";
import { dataAlumni } from "../../../constants/data.js";
import { Image, TD, TH, TR } from "./style";

class ManagementUser extends Component {
  

  renderTableData() {
    return dataAlumni.map((student) => {
      const { id, name, img, content,desc } = student
      return (
        <TR key={id}>
          <TD>{id}</TD>
          <TD>{name}</TD>
          <TD><Image src={img}></Image></TD>
          <TD>{desc}</TD>
          <TD>{content}</TD>
        </TR>
      )
    })
  }

  renderTableHeader() {
    const header = Object.keys(dataAlumni[0])
    return header.map((key, index) => <TH key={index}>{key.toUpperCase()}</TH>)
  }

  render() {
    return (
        <table className="mt-5 col-8">
          <tbody>
            <TR>{this.renderTableHeader()}</TR>
            {this.renderTableData()}
          </tbody>
        </table>
    )
  }
}
export default ManagementUser;
