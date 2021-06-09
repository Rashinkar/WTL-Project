gff');
        // }
      }

    }catch(errr){
        res.status(400).sendFile('Invalid Email')
    }
})
app.listen(port,()=>{
    console.log(`appp run on ${port}`);

})
