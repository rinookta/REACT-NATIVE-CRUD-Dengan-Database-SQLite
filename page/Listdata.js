import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Content, List, ListItem, Icon } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const Listdata = ({navigation}) =>{
  useEffect(()=>{
    // cek database dan membuat
    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS anggota(id_anggota INTEGER PRIMARY KEY AUTOINCREMENT, nama_anggota VARCHAR(100), alamat_anggota VARCHAR(100), nohp_anggota VARCHAR(100))',
        [],
      );
    });
  },[]);

  const [Dataanggota, setDataanggota]= useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getData();
		}, [])
  );
  const getData = () =>{
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM anggota order by nama_anggota asc',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
            setDataanggota(temp);
          }
        }
      );
    });
  }
  const Hapus= (id_anggota,nama_anggota) =>{
    Alert.alert(
      'Peringatan!',
      `Hapus Data Anggota "${nama_anggota}"?`,
      [
        {text: 'Batal', onPress: () => {}, style: 'cancel'},
        {text: 'Oke', onPress: () => {
          db.transaction(function(tx){
            db.executeSql(
              "DELETE FROM anggota where id_anggota=? ",
              [id_anggota],
              (tx,results)=>{
                setDataanggota(Dataanggota.filter(item => item.id_anggota !== id_anggota));
              }
            )
          })
        }},
      ],
      { cancelable: false }
    );
	}
  const Renderanggota= ({item}) =>{
		if (Dataanggota.length > 0) {
			return (
				<List key={item.id_anggota}>
					<ListItem>
						<Body>
							<Text>{item.nama_anggota}</Text>
							<Text note numberOfLines={3}>Alamat: {item.alamat_anggota}</Text>
							<Text note numberOfLines={3}>No HP: {item.nohp_anggota}</Text>
						</Body>
            <Right>
              <Button small warning transparent onPress={()=> navigation.navigate('Edit',{ id_anggota: item.id_anggota, }) }>
                <Icon name="create-outline" />
              </Button>
              <Button small danger transparent onPress={()=> Hapus(item.id_anggota,item.nama_anggota)}>
                <Icon name="trash-outline" />
              </Button>
            </Right>
					</ListItem>
				</List>
			);
		}
  }
  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Data Anggota</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=>{ navigation.navigate('Tambah') }}>
            <Text uppercase={false}>Tambah</Text>
          </Button>
        </Right>
      </Header>
      <Content padder>
        <FlatList
          data={Dataanggota}
          renderItem={Renderanggota}
          keyExtractor={ (item,index) => index.toString() }
          extraData={true}
          onRefresh={getData}
          refreshing={false}
        />
      </Content>
    </Container>
  );
}
export default Listdata;