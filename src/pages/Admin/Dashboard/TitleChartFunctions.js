export function groupmonth(item=[]) {
   let bymonth = {};
   item.forEach((value) => {
      let d = new Date(value['createdat']);
      d = d.toLocaleString('default', { month: 'long' });
      if (bymonth[d] !== undefined) {
         let checker = false;
         for (var i = 0; i < bymonth[d].length; i++) {
            if (bymonth[d][i]['title'] === value.title) {
               checker = true;
               bymonth[d][i]['count'] = bymonth[d][i]['count'] + value.count;
               break;
            }
         }
         if (checker === false) {
            bymonth[d].push({ title: value.title, count: value.count });
         }
      } else {
         bymonth[d] = [];
         bymonth[d].push({ title: value.title, count: value.count });
      }
   });

   bymonth = sortData(bymonth);

   return {...bymonth};
}

function sortData(item) {
   let sortedData = {};
   Object.keys(item).map((value) => {
      item[value].sort(function (x, y) {
         return y.count - x.count;
      });
   });

   Object.keys(item).map((value) => {
      sortedData[value] = [];
      sortedData[value] = item[value].slice(0, 10);
   });

   let filteredData = {};
   Object.keys(sortedData).map((value) => {
      filteredData[value] = { titles: [], counts: [] };
      sortedData[value].map((obj) => {
         filteredData[value]['titles'].push(obj.title);
         filteredData[value]['counts'].push(obj.count);
      });
   });
   return filteredData;
}
