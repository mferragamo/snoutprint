-- This is for part 5:
-- Write a query to get the number of records uploaded per month since we've gone live in analytics.sql in the db directory.
SELECT COUNT(*), date_trunc('month', createddate) AS month
FROM records
GROUP BY month
ORDER BY month ASC
