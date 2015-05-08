

module.exports = {
  bindEvents(tree) {
    tree.on('update', function(e){
      const paths = e.data.log;
      _.each(paths, function(path) {
        if(path[0] === 'reports' && path[2] === "statements") {
          console.log('STATEMENTS UPDATED');
        }
      });
    });


  }
}


