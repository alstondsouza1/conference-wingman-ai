type SaveToBoxRequest = {
    plan: string;
  };
  
  export async function POST(request: Request) {
    const { plan }: SaveToBoxRequest = await request.json();
  
    const token = process.env.BOX_ACCESS_TOKEN;
    const folderId = process.env.BOX_FOLDER_ID;
  
    if (!token || !folderId) {
      return Response.json(
        { success: false, message: "Missing Box token or folder ID" },
        { status: 500 }
      );
    }
  
    const fileName = `conference-wingman-guide-${Date.now()}.txt`;
  
    const formData = new FormData();
  
    formData.append(
      "attributes",
      JSON.stringify({
        name: fileName,
        parent: { id: folderId },
      })
    );
  
    formData.append("file", new Blob([plan], { type: "text/plain" }), fileName);
  
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
  
    const data = await boxResponse.json();
  
    if (!boxResponse.ok) {
      return Response.json(
        { success: false, message: "Box upload failed", details: data },
        { status: boxResponse.status }
      );
    }
  
    return Response.json({
      success: true,
      message: "Guide saved to Box",
      fileName,
    });
  }