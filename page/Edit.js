import React, { useState, } from 'react';
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Text, Right, Left, Icon } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
var db= openDatabase({name : 'UserDatabase.db'});

const Edit = ({navigation,route}) =>{
  let id_anggota= route.params?.id_anggota;
  let [nama_anggota,Setnama_anggota]= useState("");
  let [alamat_anggota,Setalamat_anggota]= useState("");
  let [nohp_anggota,Setnohp_anggota]= useState("");
  const _goBack = () => navigation.goBack();
  useFocusEffect(
    React.useCallback(() => {
      getOneData();
		}, [])
  );

  const getOneData = () =>{
    db.transaction(function(tx){
      tx.executeSql(
        "SELECT * from anggota where id_anggota= ? ",
        [id_anggota],
        (tx,results)=>{
          let res = results.rows.item(0);
          Setnama_anggota(res.nama_anggota);
			    Setalamat_anggota(res.alamat_anggota);
			    Setnohp_anggota(res.nohp_anggota);
        }
      )
    })
  }

  const ProsesEdit = () =>{
    db.transaction(function(tx){
      tx.executeSql(
        'UPDATE anggota set nama_anggota=?,alamat_anggota=?,nohp_anggota=? where id_anggota=?',
        [nama_anggota,alamat_anggota,nohp_anggota,id_anggota],
        (tx,results)=>{
          console.log('Results', results.rowsAffected);
          navigation.navigate('Listdata');
        }
      )
    })
  }
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={_goBack}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Edit Anggota</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content padder>
        <Form>
          <Item stackedLabel>
            <Label>Nama Anggota</Label>
            <Input onChangeText={(nama_anggota)=> Setnama_anggota(nama_anggota)} value={nama_anggota} />
          </Item>
          <Item stackedLabel last>
            <Label>Alamat Anggota</Label>
            <Input onChangeText={(alamat_anggota)=> Setalamat_anggota(alamat_anggota)} value={alamat_anggota} />
          </Item>
          <Item stackedLabel last>
            <Label>Nomor HP</Label>
            <Input onChangeText={(nohp_anggota)=> Setnohp_anggota(nohp_anggota)} value={nohp_anggota} />
          </Item>
          <Button primary block onPress={ProsesEdit}><Text>Edit Data</Text></Button>
        </Form>
      </Content>
    </Container>
  );
}
export default Edit;