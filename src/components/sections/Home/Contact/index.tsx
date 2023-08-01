/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import * as React from "react"
import { useCallback, useRef } from "react"
import { Trans, useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import {
  IoAtOutline,
  IoChatboxOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

interface ContactFormValues {
  name: string
  email: string
  object: string
  message: string
  recaptcha: string | null
}

const HomeContact = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  const toast = useToast({
    position: "top",
  })

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      try {
        await axios.post(
          `${process.env.GATSBY_STRAPI_API_URL}/api/contact`,
          values,
        )

        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
        reset()
        toast({
          status: "success",
          title: t("contactSuccess"),
        })
      } catch (error: any) {
        toast({
          status: "error",
          title: error.response.data.error.message,
        })
      }
    },
    [reset, t, toast],
  )

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Heading
        alignSelf={"center"}
        as={"h2"}
        fontSize={"3em"}
        padding={"10px"}
        textAlign={"center"}
      >
        <Trans>contact</Trans>
      </Heading>
      <Divider
        alignSelf={"center"}
        borderBottomColor={"primary"}
        width={"50px"}
      />
      <Box
        alignItems={"center"}
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        marginX={"25px"}
        marginY={"50px"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          <FormControl isInvalid={!!errors.name} marginY={"25px"}>
            <FormLabel display={"flex"} flexDirection={"row"} htmlFor={"name"}>
              <Icon alignSelf={"center"} as={IoPersonOutline} />
              <Text marginX={"5px"}>
                <Trans>name</Trans>
              </Text>
              <Text as={"span"} color={"red"}>
                *
              </Text>
            </FormLabel>
            <Input
              id={"name"}
              placeholder={t("namePlaceholder")}
              {...register("name", { required: t("nameRequired") })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} marginY={"25px"}>
            <FormLabel display={"flex"} flexDirection={"row"} htmlFor={"email"}>
              <Icon alignSelf={"center"} as={IoAtOutline} />
              <Text marginX={"5px"}>
                <Trans>email</Trans>
              </Text>
              <Text as={"span"} color={"red"}>
                *
              </Text>
            </FormLabel>
            <Input
              id={"email"}
              placeholder={t("emailPlaceholder")}
              {...register("email", {
                required: t("emailRequired"),
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.object} marginY={"25px"}>
            <FormLabel
              display={"flex"}
              flexDirection={"row"}
              htmlFor={"object"}
            >
              <Icon alignSelf={"center"} as={IoMailOutline} />
              <Text marginX={"5px"}>
                <Trans>object</Trans>
              </Text>
              <Text as={"span"} color={"red"}>
                *
              </Text>
            </FormLabel>
            <Input
              id={"object"}
              placeholder={t("objectPlaceholder")}
              {...register("object", {
                required: t("objectRequired"),
              })}
            />
            <FormErrorMessage>
              {errors.object && errors.object.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.message} marginY={"25px"}>
            <FormLabel
              display={"flex"}
              flexDirection={"row"}
              htmlFor={"message"}
            >
              <Icon alignSelf={"center"} as={IoChatboxOutline} />
              <Text marginX={"5px"}>
                <Trans>message</Trans>
              </Text>
              <Text as={"span"} color={"red"}>
                *
              </Text>
            </FormLabel>
            <Textarea
              id={"message"}
              placeholder={t("messagePlaceholder")}
              rows={3}
              {...register("message", {
                required: t("messageRequired"),
              })}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.recaptcha} marginY={"25px"}>
            <Controller
              name="recaptcha"
              control={control}
              rules={{ required: t("recaptchaRequired") }}
              render={({ field }) => (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.GATSBY_RECAPTCHA_KEY || ""}
                  onChange={(value: string | null) => field.onChange(value)}
                />
              )}
            />
            <FormErrorMessage>
              {errors.recaptcha && errors.recaptcha.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            bgColor={"primary"}
            color={"white"}
            isLoading={isSubmitting}
            marginY={"25px"}
            type={"submit"}
            _hover={{
              bgColor: "primaryTransparent",
            }}
          >
            <Trans>contactSubmit</Trans>
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default React.memo(HomeContact)
