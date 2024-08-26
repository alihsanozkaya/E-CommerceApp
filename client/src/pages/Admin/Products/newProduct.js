import React from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { postProduct } from "../../../api";
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
import newProductScheme from "./validations";
import { message } from "antd";

const NewProduct = () => {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });
  const handleSubmit = async (values, bag) => {

    message.loading({ content: "Loading...", key: "product_add" });

    const newValues = {
        ...values,
        photos: JSON.stringify(values.photos)
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  return (
    <div>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="2xl">New Product</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            photos: [],
          }}
          validationSchema={newProductScheme}
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
                      Add
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

export default NewProduct;
