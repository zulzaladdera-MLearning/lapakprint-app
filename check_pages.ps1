$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("D:\Documents\LapakPrint\Laporan_Proyek_LapakPrint.docx")
$pages = $doc.ComputeStatistics(2)
$lastPage = $doc.Paragraphs.Item($doc.Paragraphs.Count).Range.Information(3)
Write-Output "TOTAL_PAGES: $pages"
Write-Output "LAST_PARAGRAPH_PAGE: $lastPage"
$doc.Close()
$word.Quit()
