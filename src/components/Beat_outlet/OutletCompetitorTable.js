import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import stylesTrip from '../../assets/css/styleTrip';
import { Row, Rows, Table } from 'react-native-table-component';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function TableShow(props) {
  const tableHead = [props.H1, props.H2, props.H3, props.H4];
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ ...stylesTrip.TableMainView, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
      <Table
        borderStyle={{
          borderWidth: 0.5,
          borderColor: '#c8e1ff',
        }}>
        <Row
          data={tableHead}
          style={{ ...stylesTrip.headtable, backgroundColor: themecolor.TABLE, }}
          textStyle={{ ...stylesTrip.texttableBig, color: themecolor.ICON, textAlign: 'center' }}
        />
      </Table>
      <View>
        <Table
          borderStyle={{
            borderWidth: 0.5,
            borderColor: '#c8e1ff',
          }}>
          <Rows textStyle={stylesTrip.texttable} data={props.competitionByOutletId.map((item =>
            [
              //item.Competitor instanceof Object ? (
              <View style={{ padding: 5 }}>
                <Text style={{ ...stylesTrip.texttable, color: themecolor.TXTWHITE }}>
                  {item.Competitor.CompetitorName}
                </Text>
              </View>,
              <View style={{ padding: 5 }}>
                <Text style={{ ...stylesTrip.texttable, color: themecolor.TXTWHITE }}>
                  {item.CompetitionSku}
                </Text>
              </View>,
              <View style={{ padding: 5 }}>
                <Text style={{ ...stylesTrip.texttable, color: themecolor.TXTWHITE }}>
                  {item.Unitmaster.UnitDescription}
                </Text>
              </View>,
              <View style={{ padding: 5 }}>
                <Text style={{ ...stylesTrip.texttable, color: themecolor.TXTWHITE }}>
                  {item.CompetitionRemark}
                </Text>
              </View>
              //):(<></>)
            ]
          ))}
             />
        </Table>
      </View>
    </View>
  );
}

export { TableShow };