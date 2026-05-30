type SaveToBoxRequest = {
    plan: string;
  };
  
  export async function POST(request: Request) {
    try {
      const { plan }: SaveToBoxRequest = await request.json();
  
      const token = process.env.BOX_ACCESS_TOKEN;
      const folderId = process.env.BOX_FOLDER_ID;
  
      if (!token) {
        return Response.json(
          {
            success: false,
            message: "BOX_ACCESS_TOKEN missing from .env.local",
          },
          { status: 500 }
        );
      }
  
      if (!folderId) {
        return Response.json(
          {
            success: false,
            message: "BOX_FOLDER_ID missing from .env.local",
          },
          { status: 500 }
        );
      }
  
      const fileName = `conference-wingman-guide-${Date.now()}.txt`;
  
      const formData = new FormData();
  
      formData.append(
        "attributes",
        JSON.stringify({
          name: fileName,
          parent: {
            id: folderId,
          },
        })
      );
  
      formData.append(
        "file",
        new Blob([plan], {
          type: "text/plain",
        }),
        fileName
      );
  
      const boxResponse = await fetch(
        "https://upload.box.com/api/2.0/files/content",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      const responseText = await boxResponse.text();
  
      let parsedData: unknown = {};
  
      if (responseText) {
        try {
          parsedData = JSON.parse(responseText);
        } catch {
          parsedData = {
            rawResponse: responseText,
          };
        }
      }
  
      if (!boxResponse.ok) {
        console.error("BOX ERROR:", parsedData);
  
        return Response.json(
          {
            success: false,
            message: "Box upload failed",
            status: boxResponse.status,
            details: parsedData,
          },
          {
            status: boxResponse.status,
          }
        );
      }
  
      return Response.json({
        success: true,
        message: "Guide saved to Box successfully",
        fileName,
        details: parsedData,
      });
    } catch (error) {
      console.error("SAVE TO BOX ERROR:", error);
  
      return Response.json(
        {
          success: false,
          message: "Unexpected server error",
        },
        {
          status: 500,
        }
      );
    }
  }