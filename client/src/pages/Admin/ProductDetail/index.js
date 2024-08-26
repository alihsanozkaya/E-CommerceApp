import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { FieldArray, Formik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import editScheme from "./validations";
import { message } from "antd";

const AdminProductDetail = () => {
  const { product_id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );
  if (!isLoading) {
    console.log(data);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "The product successfully updated",
        key: "product_update",
        duration: 2,
      });
    } catch (error) {
      message.error("The product does not updated.");
    }
  };

  return (
    <div>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="2xl">Edit</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            photos: data.photos,
          }}
          validationSchema={editScheme}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <>
              <Box>
                <Box my="5" textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                        width="3xl"
                      />
                      {touched.title && errors.title && (
                        <Text color="red">{errors.title}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel>Title</FormLabel>
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                        width="3xl"
                      />
                      {touched.description && errors.description && (
                        <Text color="red">{errors.description}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                        width="3xl"
                      />
                      {touched.price && errors.price && (
                        <Text color="red">{errors.price}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel>Photos</FormLabel>
                      <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index}>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    width="3xl"
                                  />
                                  <Button
                                    ml="4"
                                    type="button"
                                    colorScheme="red"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            <Button
                              mt="5"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add a photo
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <Button
                      mt={4}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                      w="3xl"
                    >
                      Update
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </Flex>
    </div>
  );
};

export default AdminProductDetail;
