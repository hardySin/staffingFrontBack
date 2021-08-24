 

    class StorageItems  {

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