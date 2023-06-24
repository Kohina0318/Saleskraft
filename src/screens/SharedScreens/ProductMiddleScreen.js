import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../helper/SQLite DB/Sqlite';
import { useNavigation } from '@react-navigation/native';

export default function ProductMiddleScreen(props) {
  const navigation = useNavigation();
  const primaryDistributor = useSelector(state => state.primaryDistributor);
  const [productCatalogue, setProductCatalogue] = React.useState([]);

  React.useEffect(() => {
    getProductsFromDB()
  }, [])

  React.useEffect(() => {
    //   setTimeout(()=>{

    //   },2000)
    navigation.navigate('BeatOutletProducts', {
      CategoryName: props.route.params.CategoryName,
      categoryId: props.route.params.categoryId,
      isNavigateFrom: props.route.params.isNavigateFrom,
      outletId: props.route.params.outletId,
      productCatalogue: productCatalogue
    })


  }, [productCatalogue])

  const getProductsFromDB = async () => {
    // alert(props.route.params.categoryId)
    try {
      db.transaction(async tx => {
        tx.executeSql(
          `SELECT P.*,S.* from Products as P join Stock as S on P.Id=S.ProductId where P.CategoryId=${props.route.params.categoryId} AND S.OutletId=${primaryDistributor.Id}`,

          // `SELECT * from Products where CategoryId=${props.route.params.categoryId}`,

          // `select * from Outlets
          // left join Mapping on Mapping.SecondaryOutletId='${outletId}' AND Mapping.PrimaryOutletId='${primaryDistributor.Id}'
          // left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND PriceBooks.ProductId='${item.Id}'
          // left join Products on Products.Id='${item.Id}'
          // left join Units on Units.UnitId='${item.UnitD}'
          // where Outlets.Id='${outletId}'`

          //   `Select * from Products where 
          //    left join Stock on Stock.ProductId=

          //   CategoryId=${props.route.params.categoryId} `,
          [],
          (tx1, results) => {
            console.log("tx-=========88888888>", tx1);

            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              // alert(JSON.stringify(results.rows.item(i)))
              temp.push(results.rows.item(i));
            }
            setProductCatalogue(temp);
            console.log(
              'Data returned From Products SQLITE Line 46 ----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
