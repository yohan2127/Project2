function importFromExcel(data) {   
  console.log(data.length);
       for (i=0;i<data.length;i++){
           $.post('/api/import', data[i]).then(alert("import sucess"));        
        }
        
       
      }