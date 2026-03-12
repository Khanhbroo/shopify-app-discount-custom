import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  ResourceList,
  VerticalStack,
  HorizontalStack,
  Thumbnail,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  const selectedProducts = async () => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
      action: "select",
    });

    if (selected) {
      console.log("Selected Products: ", selected);
    }

    setProducts(selected);
  };

  return (
    // <Page narrowWidth>
    //   <TitleBar title={t("HomePage.title")} />
    //   <Layout>
    //     <Layout.Section>
    //       <Card sectioned>
    //         <Stack
    //           wrap={false}
    //           spacing="extraTight"
    //           distribution="trailing"
    //           alignment="center"
    //         >
    //           <Stack.Item fill>
    //             <TextContainer spacing="loose">
    //               <Text as="h2" variant="headingMd">
    //                 {t("HomePage.heading")}
    //               </Text>
    //               <p>
    //                 <Trans
    //                   i18nKey="HomePage.yourAppIsReadyToExplore"
    //                   components={{
    //                     PolarisLink: (
    //                       <Link url="https://polaris.shopify.com/" external />
    //                     ),
    //                     AdminApiLink: (
    //                       <Link
    //                         url="https://shopify.dev/api/admin-graphql"
    //                         external
    //                       />
    //                     ),
    //                     AppBridgeLink: (
    //                       <Link
    //                         url="https://shopify.dev/apps/tools/app-bridge"
    //                         external
    //                       />
    //                     ),
    //                   }}
    //                 />
    //               </p>
    //               <p>{t("HomePage.startPopulatingYourApp")}</p>
    //               <p>
    //                 <Trans
    //                   i18nKey="HomePage.learnMore"
    //                   components={{
    //                     ShopifyTutorialLink: (
    //                       <Link
    //                         url="https://shopify.dev/apps/getting-started/add-functionality"
    //                         external
    //                       />
    //                     ),
    //                   }}
    //                 />
    //               </p>
    //             </TextContainer>
    //           </Stack.Item>
    //           <Stack.Item>
    //             <div style={{ padding: "0 20px" }}>
    //               <Image
    //                 source={trophyImage}
    //                 alt={t("HomePage.trophyAltText")}
    //                 width={120}
    //               />
    //             </div>
    //           </Stack.Item>
    //         </Stack>
    //       </Card>
    //     </Layout.Section>
    //     <Layout.Section>
    //       <ProductsCard />
    //     </Layout.Section>
    //   </Layout>
    // </Page>

    <Page
      title="Product Selector"
      primaryAction={{
        content: "Select products",
        onAction: () => selectedProducts(),
      }}
    >
      <Card sectioned>
        {products.length > 0 ? (
          <VerticalStack gap="4">
            {products.map((product) => {
              const imageSource = product.images?.[0]?.originalSrc || "";

              return (
                <div key={product.id}>
                  <HorizontalStack gap="2" align="start" blockAlign="center">
                    <Thumbnail source={imageSource} alt={product.title} />
                    <VerticalStack gap="1">
                      <Text variant="headingSm" as="h3">
                        {product.title}
                      </Text>
                      <Text variant="bodySm" as="p" color="subdued">
                        ID: {product.id}
                      </Text>
                    </VerticalStack>
                  </HorizontalStack>
                </div>
              );
            })}
          </VerticalStack>
        ) : (
          <Text as="p">Pick products first</Text>
        )}
      </Card>
    </Page>
  );
}
