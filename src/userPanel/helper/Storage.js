 

    class StorageItems  {

        //  at the time of createing new object all the value inside the class mapped with  class
     
         storage;
         constructor()
        {
                this.storage=localStorage;;
        }


        setItem(key,item)
        {
            this.storage.setItem(key,item)   
        }

        getItem(key)
        {
            return this.storage.getItem(key);  
         }

         removeItem(key)
         {
             this.storage.removeItem(key)
         }

         clearItem()
         {
             this.storage.clear()
         }

       }

export default new StorageItems();