import { SafeAreaView, Text, View, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { baseService } from "../../network/services/baseService";
import { DataTable } from "react-native-paper";
import styles from "./MarketDetail.style";
import { ActivityIndicator} from 'react-native-paper';
import BackButton from "../../components/backButton/BackButton";
//import { io } from "socket.io-client";

export default function MarketDetail(prop) {
  const marketCode = prop.route.params.marketCode;
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
      getData();
      //useSocket();
  }, []);

  let url = `https://api4.bitlo.com/market/orderbook?market=${marketCode}&depth=50`;
  const getData = async () => {
    try {
      const data = await baseService.get(url);
      setBids(data.bids);
      setAsks(data.asks);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  };

  //trying to use socket but not work with that url

  // const useSocket = () => {
  //   try {
  //     const socket = io(url)
  //     socket.on('connect', () => {
  //       setBids(socket.bids);
  //       setAsks(socket.asks);
  //       setloading(false)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     setloading(false)
  //   }
  // }
 
  const goBack = () => {
    prop.navigation.goBack()
  }

  //Adjusting background color for ask and bids, according to Total
  const handleBackground = (value) => {
    let percent  = '';
    if(value / 100 < 10){
      percent = (value / 100)
      return `${1 + percent}%`
    }
    else if (value / 1000 < 10){
      percent = (value / 1000)
      return `${10 + percent}%`
    }
    else if (value / 10000 < 10){
      percent = (value / 10000)
      return `${25 + percent}%`
    }
    else if (value / 10000 < 10){
      percent = (value / 10000)
      return `${40 + percent}%`
    }
  }
  return (
    <SafeAreaView style={{flex:1}}>
        {loading ? <ActivityIndicator style={styles.indicator} animating={loading} color='blue' size='large'/> :
        <View>
        <BackButton onPress={goBack}/> 
      <ScrollView >
      <DataTable style={styles.tableContainer} >
        <DataTable.Header >
          <DataTable.Title textStyle={styles.header} numeric >Toplam(TRY)</DataTable.Title>
          <DataTable.Title textStyle={styles.header} numeric>Miktar(BTC)</DataTable.Title>
          <DataTable.Title textStyle={styles.header} numeric>Fiyat</DataTable.Title>
        </DataTable.Header>
        {asks.map((ask, key) => (
           <DataTable.Row key={key}>
           <DataTable.Cell numeric>{ask['0'] * ask['1']}</DataTable.Cell>
           <DataTable.Cell numeric>{ask['1']}</DataTable.Cell>
           <DataTable.Cell textStyle={[styles.askPrice]} numeric>{ask['0']}</DataTable.Cell>
           <Text style={[styles.askBackground, {width : handleBackground(ask['0'] * ask['1'])}]}></Text>
         </DataTable.Row>
        ))}
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={styles.header}>Fiyat</DataTable.Title>
          <DataTable.Title textStyle={styles.header} numeric>Miktar(BTC)</DataTable.Title>
          <DataTable.Title textStyle={styles.header} numeric>Toplam(TRY)</DataTable.Title>
        </DataTable.Header>
        {bids.map((bid, key) => (
          <DataTable.Row key={key} style={{flex:1}}>
          <Text style={[styles.bidBackground, {width : handleBackground(bid['0'] * bid['1'])}]}></Text>
          <DataTable.Cell textStyle={styles.bidPrice}>{bid['0']}</DataTable.Cell>
          <DataTable.Cell style={{marginLeft : -50}}  numeric>{bid['1']}</DataTable.Cell>
          <DataTable.Cell numeric>{bid['0'] * bid['1']}</DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable>
      </ScrollView>
      </View>}
    </SafeAreaView>
  );
}
