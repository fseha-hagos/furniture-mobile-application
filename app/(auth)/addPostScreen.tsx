//import liraries
import { db, storage } from '@/firebaseConfig';
import { DocumentData, addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, GestureResponderEvent, Image, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView, FlatList, Touchable } from 'react-native';
import {Formik} from "formik"
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { SelectList } from 'react-native-dropdown-select-list';
import {myProductsFromDatabasePeopsWithId,myProductsFromDatabaseProps, PRODUCT_COLORS} from '../context/constants'
import Navbar from '../components/navbar';
import Checkbox from "expo-checkbox";


interface myErrorProps {
  name?: string; // Initialize with an empty string if a default value is needed
  // ... other properties
}

interface ImageFileProps  {
  uri: string ;
  width: number;
  height: number;
  type: "image" | "video" | "livePhoto" | "pairedVideo" |undefined; // MIME type, e.g., "image/jpeg"
  fileName?: string | null; // Optional, since it might not always be available
  fileSize?: number; // Optional, in bytes
}



// create a component
const AddPostScreen = () => {

  
  const [productName, setProductName] = useState("")
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [isNew, setIsNew] = useState(true)
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedProductColors, setSelectedProductColors] = useState<string[]>([])
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImageFileProps[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  


//temporary datas from database or others in middle.
    const [categoryList, setCategoryList] = useState<DocumentData[]>([]);
    const [colorList, setColorList] = useState<DocumentData[]>([]);
    // const [selectedCatagoryList, setSelectedCatagoryList] = React.useState("");
    // const [selectedLanguage, setSelectedLanguage] = useState();
    // const [image, setImage] = useState("");
    // const [video, setVideo] = useState("");
     const [progress, setProgress] = useState(0);
     const [loading, setLoading] = useState(false);
  // const [files, setFiles] = useState<DocumentData[]>([]);
  // const [selectedProductColors, setSelectedProductColors] = useState<string[]>([]);
  // const [activeColorIndex, setActiveColorIndex] = React.useState(0);

        
  useEffect(() => {
    getCategoryList();
  }, [])
 

    const getCategoryList = async() => {
       setCategoryList([]);
        const querySnapShot = await getDocs(collection(db, "Catagory"));
        querySnapShot.forEach((doc) => {
          console.log("Docs:",doc.data())
          setCategoryList((categoryList) => [...categoryList, doc.data()]);
        })
        console.log("categoryList:",categoryList)
      }

      const handleOnCategorySelected = (label: string) => {
        setSelectedCategoryList((prev) =>
          prev.includes(label) ? prev.filter((option) => option !== label) : [...prev, label]
        );
      };


      const handleOnColorSelect = (selectedColor: string) => {
        if(checkIfColorSelected(selectedColor) !== null){
          const newProductColors = selectedProductColors.filter(color => color!== selectedColor);
          setSelectedProductColors(newProductColors);
        }
        else {
          setSelectedProductColors(selectedProductColors => [...selectedProductColors, selectedColor])
        }  
      }

      const checkIfColorSelected = (selectedColor: string) => {
        const ifAny = selectedProductColors.some(color => color === selectedColor)
        if(ifAny){
          return  selectedColor
        }
        return  null
      }

      const pickImages = async () => {
        // Request permission to access media library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          return;
        }
    
        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true, // Multiple selection requires a custom implementation
          quality: 1, // Image quality
        });
    
        if (!result.canceled && result.assets) {
          const selectedImages: ImageFileProps[] = result.assets.map((asset) =>({
                uri: asset.uri,
                width: asset.width,
                height: asset.height,
                type: asset.type,
                fileName: asset.fileName,
                fileSize: asset.fileSize,

            
          }));
          setSelectedImageFiles((prev) => [...prev, ...selectedImages]);
          // setSelectedImageFiles(result.assets); // Save selected images
        }
      };

      const removeImage = async (imageFile : ImageFileProps) => {
        setSelectedImageFiles(selectedImageFiles.filter(image => image!== imageFile));  
      }
      // async function pickImage() {
      //   let result = await ImagePicker.launchImageLibraryAsync({
      //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //     allowsEditing: true,
      //     aspect: [4, 3],
      //     quality: 1,
      //   });
    
      //   if (!result.canceled) {
      //     setImage(result.assets[0].uri);
      //     // upload the image
      //    // await uploadImage(result.assets[0].uri, "image");
      //   }
      // }


      // async function uploadImage(selectedImages : ImageFileProps[], values: myProductsFromDatabaseProps) {
      //   const response = await fetch(uri);
      //   const blob = await response.blob();
    
      //   const storageRef = ref(storage, "FurnitureFiles/" + new Date().getTime());
      //   const uploadTask = uploadBytesResumable(storageRef, blob);
    
      //   // listen for events
      //   uploadTask.on(
      //     "state_changed",
      //     (snapshot) => {
      //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       console.log("Upload is " + progress + "% done");
      //       setProgress(Number(progress.toFixed()));
      //     },
      //     (error) => {
      //       // handle error
      //       console.log("error on upload task")
      //     },
      //     () => {
      //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //         console.log("File available at", downloadURL);
      //         values.image = downloadURL;
      //         // save record
      //         await saveRecord(values);
      //         setImage("");
      //         setVideo("");
      //       });
      //     }
      //   );
      // }

      const uploadImages = async (selectedImages : ImageFileProps[], values: myProductsFromDatabaseProps) => {
        try{

          const uploadPromises = selectedImages.map((uri) => {
         

            return new Promise<{ success: boolean, downloadURL?: string }>((resolve, reject) => {
              console.log("Uploading image with type:", uri.type);
  
              // Convert the URI to a Blob for upload
              const blob = new Blob([uri as unknown as BlobPart], { type: uri.type });
    
              // Create a storage reference with a unique filename
              const storageRef = ref(storage, "FurnitureFiles/" + new Date().getTime());
               const uploadTask = uploadBytesResumable(storageRef, blob);
      
               // Track upload progress and set progress state
              uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Image upload is " + progress + "% done");
                      setProgress(Number(progress.toFixed()));
                  },
                  (error) => {
                      // Handle error during upload
                      console.error("Error during upload:", error);
                      reject({ success: false });
                  },
                  () => {
                      // Upload successful, get the download URL
                           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          console.log("File available at", downloadURL);
                          setUploadedImageUrls(uploadedImageUrls => [...uploadedImageUrls, downloadURL]);
                          resolve({ success: true, downloadURL });
                      }).catch((error) => {
                          console.error("Error getting download URL:", error);
                          reject({ success: false });
                      });
                  }
              );
          });
  
          })

          const results = await Promise.all(uploadPromises);
          console.log("All uploads completed:", results);

        }catch (error) {
          console.error("Error in uploads:", error);
        }
       
        
    
        
        
        
    
       
    };

      async function saveRecord(values: myProductsFromDatabaseProps) {
        try {
          const docRef = await addDoc(collection(db, "FurnitureDataTest"), {values});
          console.log("document saved correctly", docRef.id);
          alert("Success,"+"data added successfully");
          setLoading(false)
        } catch (e) {
          console.log(e);
          alert("Failed!!!");
          setLoading(false)
        }
      
      }

      async function saveProduct(productValues: {  
          id: string,
          title: string,
          price: string,
          category : string[],
          colors: string[],
          desc: string,
          images: string[],
          isNew: boolean,
          rating: number,}) {
        try {
            // Reference to the "ProductData" collection
            const dc = collection(db, "ProductDataTest");
            const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "_");
            // Add a new product document to the collection and get the doc reference
            
            
            const user =  await setDoc(doc(dc, timestamp), {
                ...productValues,
                id: timestamp,
                images : uploadedImageUrls,
                createdAt: timestamp, // Optional: Store the timestamp as a field
            });
            
            console.log("Document saved successfully to ProductDataTest:", timestamp);
            // Return true to indicate the product was successfully saved
            return true;
        } catch (e) {
            console.error("Error saving product to Firestore:", e);
            alert("Failed to save product. Please try again.");
            // Return false if an error occurred
            return false;
        }
    }
      
 
      
    

      const onSubmitMenu = async (values: myProductsFromDatabaseProps) =>{
       // values.image = image;

         // upload the image
        //  console.log(values.colors)
         setLoading(true)
         values.category =selectedCategoryList
         values.colors = selectedProductColors
         values.isNew = true
         values.rating = 0
         

         const uploadImageResponse  = await uploadImages(selectedImageFiles, values);
        //  values.images = uploadedImageUrls
        
          // await saveRecord(values);
          await saveProduct(values);
          setLoading(false);
        
      }
      

 
    return (

      
      
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container}>   
        <Navbar title="Add New Product " showBack ={true} showSearch = {false}/>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        
            <Formik 
              initialValues={{id:'',title:'',price:'',category:[''],colors:[''],desc:'',images:[''],rating:0,isNew:true}}
              onSubmit={(values)=> onSubmitMenu(values)}
              /////////////////////////////////////////////////////////
                //validate all the inputs, to do...//////********************/// */
              validate={
                (values)=>{
                  const errors:myErrorProps = {}
                  if(!values.title){
                    console.log("title not filled")
                    errors.name="title must be filled"
                    ToastAndroid.show("title must be filled", ToastAndroid.SHORT);
                  }
                  return errors
                }
              }
              >
                {
                  ({handleChange,handleBlur,handleSubmit,values}) => (
                    <View>
                     
                      {/* <TouchableOpacity onPress={pickImage} style={{borderRadius: 15}}>
                        {
                          image? <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 15}} resizeMode={"contain"}/>
                          : <Image source={require('./assets/images/600x400.png')} style={{width: 100, height: 100, borderRadius: 15}} resizeMode={"contain"}/>
                        }
                           
                      </TouchableOpacity> */}
                    
                      <TextInput style={styles.input} placeholder='Title' value={values?.title} onChangeText={handleChange('title')}></TextInput>
                      
                      <TextInput style={styles.input} placeholder='Description' value={values?.desc} numberOfLines={5} onChangeText={handleChange('desc')}></TextInput>
                      
                      <TextInput style={styles.input} placeholder='Price' value={values?.price} keyboardType='number-pad' onChangeText={handleChange('price')}></TextInput>
                    
                      {/* category selection */}
                      <Text style={styles.title}>Select Your Options:</Text>
                        <FlatList
                          data={categoryList}
                          keyExtractor={(item) => item.key}
                          horizontal={true} 
                          showsHorizontalScrollIndicator={false} 
                          renderItem={({ item }) => (
                            <View style={styles.optionContainer}>
                              <TouchableOpacity
                                onPress={() => handleOnCategorySelected(item.label)}
                                style={[
                                  styles.listedCategory,
                                  selectedCategoryList.some(label => label === item.label) && styles.selectedCategory,
                                ]}>
                                    <Text style={styles.label}>{item.label}</Text>
                               
                              </TouchableOpacity>
                              
                              
                            </View>
                          )}
                        />
                       
                         {/* image selection */}
                        <View style={styles.container}>
                            <Button title="Pick Images" onPress={pickImages} />
                            <Text style={styles.label}>
                              Selected Images: {selectedImageFiles.length}
                            </Text>
                            <View style={styles.imagePreview}>
                              {selectedImageFiles.map((image, index) => (
                                <View style={styles.singleImageContainer}>  
                                  <Image
                                  key={index}
                                  source={{ uri: image.uri }}
                                  style={styles.image}
                                />
                                 <TouchableOpacity onPress={() => removeImage(image)} style={ styles.removeImageButtonContainer}>
                                    <Text style={styles.removeImageButton}>
                                      X
                                    </Text>
                                  </TouchableOpacity>
                              </View>
                               
                              ))}
                            </View>
                          </View>
                          

                      {/* color selection */}
                      <View>
                          <Text style={styles.colorTitle}>color</Text>
                          <FlatList
                            numColumns={5}
                            data={PRODUCT_COLORS.colors} 
                            renderItem={({item ,index}) => (
                                 <TouchableOpacity
                                     onPress={() => handleOnColorSelect(item)}
                                      style={[
                                        styles.colorContainer,
                                        selectedProductColors.some(color => color === item) && styles.activeColorContainer,
                                      ]}>
                                      <View style={[styles.colorDot, { backgroundColor: item }]} />
                                 </TouchableOpacity>
                            )} 
                            showsVerticalScrollIndicator={false}
                          />
                      </View>
            
                      <TouchableOpacity onPress={handleSubmit as (e?: GestureResponderEvent) => void} style={[styles.submitContainer, loading && {backgroundColor: "#98989d"}]} disabled={loading}>
                        {
                          loading? <ActivityIndicator color={"#cdcdcd"} />
                          : <Text style={styles.submitText}>SUBMIT</Text>
                        }
                        
                      </TouchableOpacity>
                      

                   </View>
                  )

                  
                }

            </Formik>
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );


   
};




// define your styles
const styles = StyleSheet.create({
    container: {
    },
    scrollContainer : {
     padding: 10,
     marginBottom: 90,
    },
    addPostText : {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center"
    },
    input: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      paddingVertical: 10,
      alignItems: "center",
      textAlignVertical:'top',
      justifyContent:'center',
      fontSize: 17,
      marginVertical: 5
    },
    listedCategory :{
      flex: 1,
      paddingRight: 10,
      paddingVertical: 5,
      marginRight: 3,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
    removeImageButton : {
      textAlign: 'center',
      color: 'white',
    },
    removeImageButtonContainer : {
      position: 'absolute',
      backgroundColor: 'gray',
      width:25,
      height:25,
      borderRadius: 50,
      textAlign: 'center',
      left: 78,
      top: 8
    },
    selectedCategory : {
      backgroundColor: 'black'
    },
    selectInput : {
      marginBottom: 15,
      borderRadius: 10,
      padding: 10,
      paddingVertical: 15,
      fontSize: 17,
        marginVertical: 5
    },
    singleImageContainer :{
      position: "relative",
      display: 'flex',
     
      overflow: 'hidden'
    },
    submitContainer: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
      marginTop: 20,
    },
    submitText : {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    },
    colorTitle: {
      fontSize: 13,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    colorsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    colorContainer: {
      marginRight: 12,
      marginVertical: 3,
      flex: 1,
    },
    activeColorContainer: {
      padding: 3,
      backgroundColor: 'white',
      borderRadius: 16,
      elevation: 2,
    },
    colorDot: {
      width: 32,
      height: 32,
      borderRadius: 13,
    },

   
      // container: { padding: 20 },
      imagePreview: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
      image: { width: 100, height: 100, margin: 5, borderRadius: 5 },
      label: {  fontSize: 16, color: "gray" },
      title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
      optionContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
     
      selectedText: { marginTop: 20, fontSize: 16, fontStyle: "italic" },
    
   
});

//make this component available to the app
export default AddPostScreen;












































// //import liraries
// import { db, storage } from '@/firebaseConfig';
// import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
// import React, { Component, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, GestureResponderEvent, Image, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
// import {Formik} from "formik"
// import {Picker} from '@react-native-picker/picker';
// import * as ImagePicker from "expo-image-picker";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { SelectList } from 'react-native-dropdown-select-list';
// import {myProductsFromDatabasePeopsWithId, PRODUCT_COLORS} from '../context/constants'
// import Navbar from '../components/navbar';


// interface myErrorProps {
//   name?: string; // Initialize with an empty string if a default value is needed
//   // ... other properties
// }


// // create a component
// const AddPostScreen = () => {

//     const [catagoryList, setCatagoryList] = useState<DocumentData[]>([]);
//     const [selectedCatagoryList, setSelectedCatagoryList] = React.useState("");
//     const [selectedLanguage, setSelectedLanguage] = useState();
//     const [image, setImage] = useState("");
//     const [video, setVideo] = useState("");
//      const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState<DocumentData[]>([]);
//   const [selectedProductColors, setSelectedProductColors] = useState<string[]>([]);
//   const [activeColorIndex, setActiveColorIndex] = React.useState(0);

        
//   useEffect(() => {
//     getCatagiryList();
//   }, [])
 

//     const getCatagiryList = async() => {

//        setCatagoryList([]);
//         const querySnapShot = await getDocs(collection(db, "Catagory"));
//         querySnapShot.forEach((doc) => {
//           console.log("Docs:",doc.data())
//           setCatagoryList((catagoryList) => [...catagoryList, doc.data()]);
//         })
//         console.log("catagoryList:",catagoryList)
//       }

//       const handleOnColorSelect = (selectedColor: string) => {
//         if(checkIfColorSelected(selectedColor) !== null){
//           const newProductColors = selectedProductColors.filter(color => color!== selectedColor);
//           setSelectedProductColors(newProductColors);
//         }
//         else {
//           setSelectedProductColors(selectedProductColors => [...selectedProductColors, selectedColor])
//         }  
//       }

//       const checkIfColorSelected = (selectedColor: string) => {
//         const ifAny = selectedProductColors.some(color => color === selectedColor)
//         if(ifAny){
//           return  selectedColor
//         }
//         return  null
//       }

//       async function pickImage() {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         if (!result.canceled) {
//           setImage(result.assets[0].uri);
//           // upload the image
//          // await uploadImage(result.assets[0].uri, "image");
//         }
//       }


//       async function uploadImage(uri: string | URL | Request, values: myProductsFromDatabasePeopsWithId) {
//         const response = await fetch(uri);
//         const blob = await response.blob();
    
//         const storageRef = ref(storage, "FurnitureFiles/" + new Date().getTime());
//         const uploadTask = uploadBytesResumable(storageRef, blob);
    
//         // listen for events
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log("Upload is " + progress + "% done");
//             setProgress(Number(progress.toFixed()));
//           },
//           (error) => {
//             // handle error
//             console.log("error on upload task")
//           },
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//               console.log("File available at", downloadURL);
//               values.image = downloadURL;
//               // save record
//               await saveRecord(values);
//               setImage("");
//               setVideo("");
//             });
//           }
//         );
//       }

//       async function saveRecord(values: myProductsFromDatabasePeopsWithId) {
//         try {
//           const docRef = await addDoc(collection(db, "FurnitureData"), {values});
//           console.log("document saved correctly", docRef.id);
//           alert("Success,"+"data added successfully");
//           setLoading(false)
//         } catch (e) {
//           console.log(e);
//           alert("Failed!!!");
//           setLoading(false)
//         }
      
//       }
      
 
      
    

//       const onSubmitMenu = async (values: myProductsFromDatabasePeopsWithId) =>{
//        // values.image = image;

//          // upload the image
//          console.log(values.colors)
//          setLoading(true)
//          values.catagory =selectedCatagoryList
//          values.colors = selectedProductColors
//           await uploadImage(image, values);
//          // await saveRecord(values);
            
        
//       }
      

 
//     return (
      
//       <KeyboardAvoidingView>
//         <SafeAreaView style={styles.container}>
          
//         <Navbar title="Add New Product " showBack ={true} showSearch = {false}/>

          
//       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
//             <Formik 
//             initialValues={{id:'',title:'',catagory:'',price:'',colors:[''],color:'',desc:'',rating:0,isNew:false,isLiked:false,totalPurchase:1,image:''}}
//             onSubmit={(values)=> onSubmitMenu(values)}
//              /////////////////////////////////////////////////////////
//               //validate all the inputs, to do...//////********************/// */
//             validate={
//               (values)=>{
//                 const errors:myErrorProps = {}
//                 if(!values.title){
//                   console.log("title not filled")
//                   errors.name="title must be filled"
//                   ToastAndroid.show("title must be filled", ToastAndroid.SHORT);
//                 }
//                 return errors
//               }
//             }
//             >
//                 {
//                   ({handleChange,handleBlur,handleSubmit,values}) => (
//                     <View>
                     
//                       <TouchableOpacity onPress={pickImage} style={{borderRadius: 15}}>
//                         {
//                           image? <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 15}} resizeMode={"contain"}/>
//                           : <Image source={require('./assets/images/600x400.png')} style={{width: 100, height: 100, borderRadius: 15}} resizeMode={"contain"}/>
//                         }
                           
//                       </TouchableOpacity>
                   
//                       <TextInput style={styles.input} placeholder='Title' value={values?.title} onChangeText={handleChange('title')}></TextInput>
                      
//                       <TextInput style={styles.input} placeholder='Description' value={values?.desc} numberOfLines={5} onChangeText={handleChange('desc')}></TextInput>
                      
//                       <TextInput style={styles.input} placeholder='Price' value={values?.price} keyboardType='number-pad' onChangeText={handleChange('price')}></TextInput>
                      
//                       <SelectList 
//                          setSelected={(val: string) => setSelectedCatagoryList(val)} 
//                          data={catagoryList} 
//                          save="value"
//                          onSelect={() => handleChange('catagory')} 
//                          boxStyles={styles.selectInput}
//                        />
                      
//                       <View>
//               <Text style={styles.colorTitle}>color</Text>
//               <FlatList
//               numColumns={5}
//              data={PRODUCT_COLORS.colors} 
//              renderItem={({item ,index}) => (
//               <TouchableOpacity
//               onPress={() => handleOnColorSelect(item)}
//               style={[
//                 styles.colorContainer,
//                 selectedProductColors.some(color => color === item) && styles.activeColorContainer,
//               ]}>
//               <View style={[styles.colorDot, { backgroundColor: item }]} />
//             </TouchableOpacity>
//              )} 
            
//              showsVerticalScrollIndicator={false}
//            />
//             </View>
            
//                     <TouchableOpacity onPress={handleSubmit as (e?: GestureResponderEvent) => void} style={[styles.submitContainer, loading && {backgroundColor: "#98989d"}]} disabled={loading}>
//                       {
//                         loading? <ActivityIndicator color={"#cdcdcd"} />
//                         : <Text style={styles.submitText}>SUBMIT</Text>
//                       }
                      
//                     </TouchableOpacity>
                     

//                     </View>
//                   )

                  
//                 }

//             </Formik>
//             </ScrollView>
//         </SafeAreaView>
//         </KeyboardAvoidingView>
//     );


   
// };




// // define your styles
// const styles = StyleSheet.create({
//     container: {
      
      
//     },
//     scrollContainer : {
//      padding: 10,
//      marginBottom: 90,
//     },
//     addPostText : {
//       fontSize: 25,
//       fontWeight: "bold",
//       textAlign: "center"
//     },
//     input: {
//       borderWidth: 1,
//       borderRadius: 10,
//       padding: 10,
//       paddingVertical: 10,
//       alignItems: "center",
//       textAlignVertical:'top',
//       justifyContent:'center',
//       fontSize: 17,
//       marginVertical: 5
//     },
//     selectInput : {
//       marginBottom: 15,
//       borderRadius: 10,
//       padding: 10,
//       paddingVertical: 15,
//       fontSize: 17,
//         marginVertical: 5
//     },
//     submitContainer: {
//       backgroundColor: "blue",
//       padding: 10,
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 100,
//       marginTop: 20,
//     },
//     submitText : {
//       color: 'white',
//       fontSize: 15,
//       fontWeight: 'bold'
//     },
//     colorTitle: {
//       fontSize: 13,
//       color: 'black',
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     colorsRow: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       alignItems: 'center',
//     },
//     colorContainer: {
//       marginRight: 12,
//       marginVertical: 3,
//       flex: 1,
//     },
//     activeColorContainer: {
//       padding: 3,
//       backgroundColor: 'white',
//       borderRadius: 16,
//       elevation: 2,
//     },
//     colorDot: {
//       width: 32,
//       height: 32,
//       borderRadius: 13,
//     },
   
// });

// //make this component available to the app
// export default AddPostScreen;
