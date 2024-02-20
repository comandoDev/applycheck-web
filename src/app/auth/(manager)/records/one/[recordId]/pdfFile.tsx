'use client'

import { IRecord } from '@/interfaces/Record';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        padding: 40,
    },
    title: {
        width: '100%',
        fontSize: '15px',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    table: {
        fontSize: '6px',
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: 20
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center'
    },
    tableCell: {
        width: '33.3%',
        padding: 3,
        textAlign: 'left',
        border: '1px solid black',
        height: '100%'
    },
    headerCell: {
        backgroundColor: '#c4bebe',
        fontWeight: 'bold',
    },
    text: {
        flexDirection: 'column',
        textAlign: 'center',
        width: '100%',
        marginTop: 20,
    },
    textFirst: {
        borderBottom: '2px solid black',
    },
    textItem: {
        fontSize: '10px',
        padding: 12,
        borderBottom: '2px solid black',
    },
    bold: {
        fontWeight: 'bold'
    },
    table2: {
        fontSize: 7,
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: 20,
      },
      tableRow2: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        alignItems: 'center',
      },
      tableCell2: {
        flex: 1, // Alterado para usar flex para garantir duas colunas
        padding: 8,
        textAlign: 'left',
        border: '1px solid #dddddd',
      },
      headerCell2: {
        fontWeight: 'bold',
      }
})

const PDFFile = ({ record }: { record: IRecord }) => (
  <Document>
    <Page size='A4' style={styles.body}>
        <View style={styles.table2}>
            <View style={[styles.tableRow2, styles.headerCell2]}>
                <Text style={[styles.tableCell, styles.headerCell2]}>Responsável pelo preenchimento</Text>
                <Text style={[styles.tableCell, styles.headerCell2]}>João Guilherme Zanardo</Text>
            </View>
            <View style={[styles.tableRow2, styles.headerCell2]}>
                <Text style={[styles.tableCell, styles.headerCell2]}>Elaborado por</Text>
                <Text style={[styles.tableCell, styles.headerCell2]}>João Guilherme Zanardo</Text>
            </View>
            <View style={[styles.tableRow2, styles.headerCell2]}>
                <Text style={[styles.tableCell, styles.headerCell2]}>Número total de não conformidades</Text>
                <Text style={[styles.tableCell, styles.headerCell2]}>13</Text>
            </View>
            <View style={[styles.tableRow2, styles.headerCell2]}>
                <Text style={[styles.tableCell, styles.headerCell2]}>Data</Text>
                <Text style={[styles.tableCell, styles.headerCell2]}>19/02/2024</Text>
            </View>
        </View>

        <View style={styles.table}>
            <View style={[styles.tableRow, styles.headerCell]}>
                <Text style={[styles.tableCell, styles.headerCell]}>Questão</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Resposta</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Observação,</Text>
            </View>

            {record.steps?.map(step => (
                step.fields.map((field, key) => {
                    return (
                        <View style={styles.tableRow} key={key}>
                            <Text style={styles.tableCell}>{field.key}</Text>
                            <Text style={styles.tableCell}>{field.value}</Text>
                            <Text style={styles.tableCell}>{field.observation}</Text>
                        </View>
                    )
                })
            ))}
        </View>

        <View style={styles.text}>
            <View style={styles.textItem}></View>
            <View style={[styles.textItem, styles.textFirst]}>
                <Text>Observações:</Text>
            </View>
            <View style={styles.textItem}></View>
            <View style={styles.textItem}></View>
            <View style={styles.textItem}></View>
        </View>
    </Page>
  </Document>
);

export default PDFFile;
