import React, { useState, } from 'react';
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Text, Right, Left, Icon } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
var db= openDatabase({name : 'UserDatabase.db'});

const Tambah = ({navigation}) =>{
  let [nama_anggota,Setnama_anggota]= useState("");
  let [alamat_anggota,Setalamat_anggota]= useState("");
  let [nohp_anggota,Setnohp_anggota]= useState("");
  const _goBack = () => navigation.goBack();
  const ProsesSimpan = () =>{
    db.transaction(function(tx){
      tx.executeSql(
        'INSERT into anggota (nama_anggota,alamat_anggota,nohp_anggota) VALUES (?,?,?)',
        [nama_anggota,alamat_anggota,nohp_anggota],
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
          <Title>Tambah Anggota</Title>
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
          <Button primary block onPress={ProsesSimpan}><Text>Simpan</Text></Button>
        </Form>
      </Content>
    </Container>
  );
}
export default Tambah;